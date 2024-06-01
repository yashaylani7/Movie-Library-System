import React from 'react'
import Image_Gallery from './Image_Gallery'
import Video_Gallery from './Video_Gallery'
import Cast_Gallery from './Cast_Gallery'

function Media_Gallery() {
  return (
    <div className='container'>
      <Image_Gallery />
      <Video_Gallery />
      <Cast_Gallery />
    </div>
  )
}

export default Media_Gallery
