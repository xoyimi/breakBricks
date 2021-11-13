export const collides = (a: any, b: any): boolean => {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  )
}
export function getImageUrl(name: string) {
  console.log(import.meta)
  return new URL(`/src/assets/${name}`, import.meta.url).href
}
