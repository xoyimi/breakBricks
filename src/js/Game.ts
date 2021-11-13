import ResourceLoader from '../utils/ResourceManager'
import Sense from '../sense/sense'

export default class Game {
  static instance: Game
  canvas: HTMLCanvasElement
  _ctx: CanvasRenderingContext2D
  sense: Sense
  images: { [key: string]: HTMLImageElement } = {}
  actions: any = {}
  keyDowns: any = {}
  constructor(canvas: HTMLCanvasElement, fpx: number = 30) {
    this.canvas = canvas
    this._ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    // event listeners
    window.addEventListener('keydown', (event) => {
      this.keyDowns[event.key] = true
    })
    window.addEventListener('keyup', (event) => {
      this.keyDowns[event.key] = false
    })
    this.init()
  }
  static getInstance(canvas: HTMLCanvasElement, fpx: number = 30) {
    this.instance = this.instance || new Game(canvas, fpx)
    return this.instance
  }

  drawImage(image, x, y) {}
  update() {
    this.sense.update()
  }
  draw() {
    this.sense.draw()
  }
  init() {
    let counts = 0
  }

  renderLoop() {
    Object.keys(this.actions).forEach((key) => {
      if (this.keyDowns[key]) {
        this.actions[key]()
      }
    })
    this.update()
    this._ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.draw()
    requestAnimationFrame(this.renderLoop.bind(this))
  }
  registerAction(key, callback) {
    this.actions[key] = callback
  }

  transitionSense(sense) {
    this._sense = sense
  }
}
