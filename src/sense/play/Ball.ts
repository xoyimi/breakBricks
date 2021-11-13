import type Game from '../../js/Game'
import resourceLoader from '../../utils/resourceManager'

export default class Ball {
  game: Game
  x = 0
  y = 0
  speedX = 1
  speedY = 1
  img
  width
  height
  private _fire = false

  static instance: Ball
  static getInstance(game: Game, speedX?: number, speedY?: number) {
    this.instance = this.instance || new Ball(game, speedX, speedY)
    return this.instance
  }
  constructor(game: Game, speedX: number = 1, speedY: number = 1) {
    this.game = game
    this.speedX = speedX
    this.speedY = speedY
    this.img = resourceLoader.getImage('ball')?.img as HTMLImageElement
    this.width = 12
    this.height = 12
  }
  fire() {
    this._fire = !this._fire
  }
  move() {
    if (this._fire) {
      if (this.x > this.game.canvas.width - this.width || this.x < 0) {
        this.speedX *= -1
      }
      if (this.y > this.game.canvas.height - this.height || this.y < 0) {
        this.speedY *= -1
      }
      this.y += this.speedY
      this.x += this.speedX
    }
  }
  bounce() {
    this.speedY *= -1
  }
}
