import resourceManager from '../../utils/resourceManager'

export default class Block {
  x = 0
  y = 0
  lives = 3
  img
  width
  height

  constructor(x: number = 0, y: number = 0, lives: number = 1) {
    this.x = x
    this.y = y
    this.lives = lives
    this.img = resourceManager.getImage('block')?.img as HTMLImageElement
    this.width = 60
    this.height = 12
  }

  beCollided() {
    this.lives--
    if (this.lives <= 0) {
    }
  }
}
