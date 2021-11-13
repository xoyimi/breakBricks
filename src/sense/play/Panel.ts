import type Game from '../../js/Game'
import ResourceManager from '../../utils/resourceManager'

export default class Panel {
  game: Game
  x = 250
  y = 350
  speed = 4
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
    this.img = ResourceManager.getImage('panel')?.img as HTMLImageElement
    this.width = 60
    this.height = 15
    console.log(this)
  }
  moveRight() {
    this.x < this.game.canvas.width - this.width && (this.x += this.speed)
  }
  moveLeft() {
    this.x > 0 && (this.x -= this.speed)
  }
}
