import React from 'react'
import ItemCards from '../ItemCards/ItemCards';
import Grid from '@mui/material/Grid';
import './ItemZone.css'
import dataItem from '../Data.json'
const ItemZone = () => {
  return (
    <div className='itemZone'>
         <Grid container spacing={4}>
        {
            dataItem.map(data=>{
                return  <Grid item xs = {12} sm={6} md={3}><ItemCards id={data.id} img={data.images[0]} title={data.title}/></Grid>
        
            })
        }

        </Grid>
    </div>
  )
}

export default ItemZone