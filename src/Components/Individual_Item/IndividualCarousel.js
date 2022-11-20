import React from 'react'
const IndividualCarousel = ({images}) => {
  return (
    <div>
       {images?.map((imgSrc, index) => (<img src={imgSrc} key={index} alt="Make sure to include a alt tag, because react might throw an error at build"/>))}
    </div>
  )
}

export default IndividualCarousel