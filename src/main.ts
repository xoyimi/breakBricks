import './style.css'

import Game from './js/Game'
import ResourceManager from './utils/ResourceManager'
import { getImageUrl } from './utils'

let images = [
  { name: 'coin', src: getImageUrl('coin.png') },
  { name: 'lose_bg', src: getImageUrl('lose_bg.png') },
  { name: 'panel', src: getImageUrl('panel.png') },
  { name: 'play_sense_bg', src: getImageUrl('play_sense_bg.png') },
  { name: 'coin', src: getImageUrl('coin.png') },
]

await ResourceManager.imagesLoader(images)

Game.getInstance(document.getElementById('canvas') as HTMLCanvasElement, 30)
