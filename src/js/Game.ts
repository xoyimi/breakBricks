import PlaySense from '../sense/play/sense'

import type Sense from '../sense/sense'

export default class Game {
  static instance: Game
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  sense: Sense
  images: { [key: string]: HTMLImageElement } = {}
  actions: any = {}
  keyDowns: any = {}
  constructor(canvas: HTMLCanvasElement, fpx: number = 30) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    this.sense = PlaySense.getInstance(this)

    // event listeners
    window.addEventListener('keydown', (event) => {
      this.keyDowns[event.key] = true
    })
    window.addEventListener('keyup', (event) => {
      this.keyDowns[event.key] = false
    })
    this.update()
  }
  static getInstance(canvas: HTMLCanvasElement, fpx: number = 30) {
    this.instance = this.instance || new Game(canvas, fpx)
    return this.instance
  }

  update() {
    Object.keys(this.actions).forEach((key) => {
      if (this.keyDowns[key]) {
        this.actions[key]()
      }
    })
    this.sense.update()
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.sense.draw()
    requestAnimationFrame(this.update.bind(this))
  }
  registerAction(key: string, callback: () => void) {
    this.actions[key] = callback
  }
  cancelAction(key: string) {
    this.actions[key] = null
  }

  transitionSense(sense) {
    this._sense = sense
  }
}
