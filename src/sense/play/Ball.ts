import type Game from '../../js/Game'
import ResourceLoader from '../../utils/ResourceManager'

export default class Ball {
  game: Game
  posX = 0
  posY = 0
  speedX = 0.1
  speedY = 0.1
  img
  width
  height
  fire = false

  constructor(game: Game) {
    this.game = game
    this.img = ResourceLoader.getImage('ball')
    this.width = this.img.width
    this.height = this.img.height
  }
  move() {
    if (this.fire) {
      if (this.posX >= this.game.canvas.width - this.width || this.posX <= 0) {
        this.posX -= this.speedX
      }
      if (
        this.posY >= this.game.canvas.height - this.height ||
        this.posY <= 0
      ) {
        this.posY -= this.speedY
      }
      this.posY += this.speedX
      this.posX += this.speedX
    }
  }
  bounce() {
    this.speedY *= -1
  }
}
