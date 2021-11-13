import type Game from '../js/Game'
export default abstract class Sense {
  game: Game
  constructor(game: Game) {
    this.game = game
  }
  abstract update(): void
  abstract draw(): void
}
