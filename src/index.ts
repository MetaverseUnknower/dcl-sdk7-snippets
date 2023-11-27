import { createImage } from './imageSnippets'

export function main() {
  // Clickable Image Using All Options
  createImage({
    position: { x: 4, y: 2, z: 8 }, // The position of the image
    scale: { x: 1.08, y: 1.92 }, // The size of the image
    rotation: { x: 0, y: 0, z: 0 }, // The rotation of the image
    imageSrc: 'https://picsum.photos/1080/1920', // URL or path to the image you want to display
    linkUrl: 'https://decentraland.org', // The URL you want to open when the image is clicked  (optional)
    hoverText: 'To DCL', // The text that will appear when the image is hovered over (optional)
    maxDistance: 4, // Maximum distance the image is clickable from (optional)
    collider: true // Prevents the player from walking through the image  (optional)
  })

  // Clickable Image Without Collider
  createImage({
    position: { x: 8, y: 2, z: 8 },
    scale: { x: 1.6, y: 0.9, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    imageSrc: 'https://api.vlm.gg/media/demo-image/1.png',
    linkUrl: 'https://vlm.gg',
    hoverText: 'To Virtual Land Manager'
  })

  // Image Without Clickable Link
  createImage({
    position: { x: 12, y: 2, z: 8 },
    scale: { x: 1.92, y: 1.08 },
    rotation: { x: 0, y: 0, z: 0 },
    imageSrc: 'https://picsum.photos/1920/1080'
  })

  // Super Simple 1x1 Square
  createImage({
    position: { x: 8, y: 4, z: 8 },
    imageSrc: 'https://picsum.photos/1000'
  })
}
