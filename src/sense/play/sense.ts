import type Game from '../../js/Game'
import Sense from '../sense'
import Ball from './Ball'
import Panel from './Panel'
import Block from './Block'
import { collides } from '../../utils'
import ResourceManager from '../../utils/resourceManager'
export default class PlaySense extends Sense {
  static instance: PlaySense
  panel: Panel
  ball: Ball
  blocks: Block[] = []
  score: number = 0
  registerAction() {}
  cancelAction() {}
  static getInstance(game: Game) {
    this.instance = this.instance || new PlaySense(game)
    return this.instance
  }
  constructor(game: Game) {
    super(game)
    this.panel = Panel.getInstance(game)
    this.ball = Ball.getInstance(game)
    const _senseWidth = this.game.canvas.width
    for (var i = 0; i < 4; i++) {
      this.blocks.push(new Block(Math.random() * _senseWidth, i * 100, i))
    }
    game.registerAction('a', () => {
      this.panel.moveLeft()
    })
    game.registerAction('d', () => {
      this.panel.moveRight()
    })
    addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        this.ball.fire()
      }
    })
    document
      .getElementsByClassName('rangeInput')[0]
      .addEventListener('input', (event) => {
        if (this.ball.speedX < 0) {
          this.ball.speedX = -event?.target?.value / 10
        } else {
          this.ball.speedX = event?.target?.value / 10
        }
        if (this.ball.speedY < 0) {
          this.ball.speedY = -event?.target?.value / 10
        } else {
          this.ball.speedY = event?.target?.value / 10
        }
      })
  }

  draw() {
    // draw background
    this.game.ctx.drawImage(
      ResourceManager.getImage('play_sense_bg')?.img as HTMLImageElement,
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height
    )
    // draw panel
    this.game.ctx.drawImage(
      this.panel.img,
      this.panel.x,
      this.panel.y,
      this.panel.width,
      this.panel.height
    )
    // draw ball
    this.game.ctx.drawImage(
      this.ball.img,
      this.ball.x,
      this.ball.y,
      this.ball.width,
      this.ball.height
    )
    // draw blocks
    for (var i = 0; i < this.blocks.length; i++) {
      var block = this.blocks[i]
      if (collides(this.ball, block)) {
        block.beCollided()
        if (block.lives === 0) {
          this.blocks.splice(i, 1)
          this.score = this.score + 20
        }
        this.ball.bounce()
      }
      if (block.lives > 0) {
        this.game.ctx.drawImage(
          block.img,
          block.x,
          block.y,
          block.width,
          block.height
        )
      }
    }
    this.updateScore()
  }
  updateScore() {
    // draw score
    this.game.ctx.font = '20px Arial'
    this.game.ctx.fillStyle = '#fff'
    this.game.ctx.fillText('分数: ' + this.score, 10, 290)
  }
  update() {
    if (collides(this.ball, this.panel)) {
      this.ball.bounce()
    }

    this.ball.move()
  }
}
