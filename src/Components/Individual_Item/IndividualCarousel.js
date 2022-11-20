import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const IndividualCarousel = ({ images }) => {
  console.log(images, "images")
  return (
    // <div>
    //   {images?.map((imgSrc, index) => (<img src={imgSrc} key={index} alt="alt_tag" />))}
    // </div>

    <Carousel>
      {
        images?.map((imgSrc) => {
          return <div>
            <img src={imgSrc} />
            <p className="legend">Legend 1</p>
          </div>
        })
      }
      {/* <div>
        <img src="assets/1.jpeg" />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src="assets/2.jpeg" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src="assets/3.jpeg" />
        <p className="legend">Legend 3</p>
      </div> */}
    </Carousel>
  )
}

export default IndividualCarousel