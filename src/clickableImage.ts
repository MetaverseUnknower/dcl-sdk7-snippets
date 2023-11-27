import {
  ColliderLayer,
  InputAction,
  Material,
  MeshCollider,
  MeshRenderer,
  Transform,
  engine,
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { openExternalUrl } from '~system/RestrictedActions'

export const createClickableImage: CallableFunction = (options: {
  position: { x: number; y: number; z: number }
  scale?: { x: number; y: number }
  rotation?: { x: number; y: number; z: number }
  imageSrc: string
  linkUrl?: string
  hoverText?: string
  collider?: boolean
  maxDistance?: number
}) => {
  const { position, imageSrc } = options

  // Set up an entity for the image
  const imageEntity = engine.addEntity()

  // Add a 3D plane to show the image
  MeshRenderer.setPlane(imageEntity)

  // Set up what types of colliders the image will need
  const colliderLayers: ColliderLayer[] = []
  if (options.collider) {
    colliderLayers.push(ColliderLayer.CL_PHYSICS)
  }
  if (options.linkUrl) {
    colliderLayers.push(ColliderLayer.CL_POINTER)
  }

  // Give the image a collider to make it clickable
  if (colliderLayers.length > 0) {
    MeshCollider.setPlane(imageEntity, colliderLayers)
  }

  // Create a texture with the image url (or relative path)
  const texture = Material.Texture.Common({ src: imageSrc })

  // Give the entity a basic material using the texture above
  Material.setBasicMaterial(imageEntity, { texture })

  if (options.position) {
    // Give the entity a transform so it can be seen
    Transform.createOrReplace(imageEntity, {
      position: Vector3.create(options.position.x, options.position.y, options.position.z),
      scale: Vector3.create(options.scale?.x || 1, options.scale?.y || 1, 0),
      rotation: Quaternion.fromEulerDegrees(
        options.rotation?.x || 0,
        options.rotation?.y || 0,
        options.rotation?.z || 0
      )
    })
  }

  // If no click URL is provided, exit function and don't set up the pointer down event
  if (!options?.linkUrl) return

  // Set up the pointer down event
  pointerEventsSystem.onPointerDown(
    {
      entity: imageEntity,
      opts: {
        button: InputAction.IA_POINTER,
        showFeedback: !!options.hoverText,
        hoverText: options.hoverText,
        maxDistance: options.maxDistance
      }
    },
    () => {
      // Open a url when the image is clicked
      openExternalUrl({ url: options.linkUrl || '' })
    }
  )
}

/*
  -----------------------------------------------------------------------------------------
  
     \  |    \    _ \  __|    _ ) \ \  /    |  |  \ |  |  /   \ |   _ \ \ \      / __|  _ \ 
    |\/ |   _ \   |  | _|     _ \  \  /     |  | .  |  . <   .  |  (   | \ \ \  /  _|     / 
   _|  _| _/  _\ ___/ ___|   ___/   _|     \__/ _|\_| _|\_\ _|\_| \___/   \_/\_/  ___| _|_\ 
                                                                                            
  ------------------ Open Source - Free for all to use for all purposes ------------------
  ----------- For help contact 'unknower' on Discord or email dev@unknower.com -----------
  */
