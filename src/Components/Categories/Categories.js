import React from 'react'
import dataItem from '../Data.json'
import './Categories.css'
import {Link, useParams} from 'react-router-dom'
const Categories = ({data}) => {
    const uniqueCategory = []
    data.map(datum=>{
        if (uniqueCategory.indexOf(datum.category)===-1){
            uniqueCategory.push(datum.category)
        }
    })
  return (
    <div className='categories'>
       <ul>
        {
            uniqueCategory.map(item=>{
              
                return <li key={item.id}><Link className='category-list'to='/categories'>{item}</Link></li>
            })
        }
       </ul>
    </div>
  )
}

export default Categories