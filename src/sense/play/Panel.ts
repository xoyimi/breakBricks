import type Game from '../../js/Game'

export default class Panel {
  game: Game
  posX = 0
  posY = 0
  speed = 1
  img
  width
  height
  static instance: Panel
  static getInstance(game: Game) {
    this.instance = this.instance || new Panel(game)
    return this.instance
  }

  constructor(game: Game) {
    this.game = game
    this.img = game.getImage('panel')
    this.width = this.img.width
    this.height = this.img.height
  }
  moveLeft() {
    this.posX < 0 && (this.posX += this.speed)
  }
  moveRight() {
    this.posX < this.game.canvas.width + this.width && (this.posX -= this.speed)
  }
}
