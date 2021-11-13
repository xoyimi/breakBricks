export default abstract class ResourceManager {
  static imgCaches: { name: string; img: HTMLImageElement }[] = []

  static getImage(name: string) {
    return this.imgCaches.find((img) => img.name === name)
  }

  static imagesLoader(images: { name: string; src: string }[]) {
    return new Promise((resolve) => {
      const promises = images.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => {
            resolve({ name: image.name, img })
          }
          img.onerror = () => {
            reject(new Error(`Failed to load image ${image.src}`))
          }
          img.src = image.src
        })
      })
      Promise.all(promises).then((images) => {
        this.imgCaches = images as { name: string; img: HTMLImageElement }[]
        resolve('images is loaded')
      })
    })
  }
}
