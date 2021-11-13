export default abstract class ResourceManager {
  static imgCaches: { name: string }[] = []
  static getImage(name: string) {
    return this.imgCaches.find((img) => img.name === name)
  }
  static imagesLoader(images: { name: string; src: string }[]) {
    console.log('imagesLoader', images)
    return new Promise((resolve) => {
      const promises = images.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => {
            resolve(img)
          }
          img.onerror = () => {
            reject(new Error(`Failed to load image ${image.src}`))
          }
          img.src = image.src
        })
      })
      Promise.all(promises).then((images) => {
        console.log('images', images)
        this.imgCaches = images
        resolve(images)
      })
    })
  }
}
