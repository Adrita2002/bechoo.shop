import React from 'react'
import dataItem from '../Data.json'
import './Categories.css'
import {Link, useParams,useNavigate} from 'react-router-dom'
const Categories = ({data}) => {
    const uniqueCategory = []
    data.map(datum=>{
        if (uniqueCategory.indexOf(datum.category)===-1){
            uniqueCategory.push(datum.category)
        }
    })
    const navigate = useNavigate();
  return (
    <div className='categories'>
       <ul>
        {
            uniqueCategory.map(item=>{
              
                return <li key={item.id}><p className='category-list'   onClick={()=>navigate(`categories/${item}`)}>{item}</p></li>
            })
        }
       </ul>
    </div>
  )
}

export default Categories