import React from 'react'
import IndividualDesc from './IndividualDesc'
// import './Individual.css'
import { useParams } from 'react-router-dom'
import dataItem from '../Data.json'
import IndividualCarousel from './IndividualCarousel'
const Individual = () => {
  const { userId } = useParams();
  return (
    <div classname='item-container'>
      {
        dataItem.map(data => {
          if (userId == data.id) return (
            // <h2 className ='item-heading'>{data.title}</h2>
            <IndividualCarousel images={data.images} />
          )
        })
      }
    </div>
  )
}

export default Individual