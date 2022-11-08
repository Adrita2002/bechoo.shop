import React from 'react'
import IndividualDesc from './IndividualDesc'
import './Individual.css'
import { useParams } from 'react-router-dom'
import dataItem from '../Data.json'
const Individual = () => {
    const {userId} = useParams();
  return (
    <div classname='item-container'>
    {
        dataItem.map(data=>{
            if(userId==data.id)return(
                <h2>{data.title}</h2>
                )
        })
    }
    </div>
  )
}

export default Individual