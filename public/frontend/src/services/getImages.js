import { remoteUrl } from "./remoteUrl"
const URI = remoteUrl || 'http://192.168.0.73:5000'

const getImages = (images) => {
  if (images && images.length > 0) {
    const imagesList = images.map((imageName) => {

      return (
        `${URI}/uploads/images/${imageName}`
      )
    })
    return imagesList
  }

  return (
    [`${URI}/uploads/images/no-image.png`]
  )
}

export {getImages}