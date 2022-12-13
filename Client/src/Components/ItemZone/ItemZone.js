import React,{useState, useEffect} from 'react'
import fire from './fire.png';
import ItemCards from '../ItemCards/ItemCards';
import Grid from '@mui/material/Grid';
import './ItemZone.css'
import dataItem from '../Data.json'
import axios from 'axios';
const ItemZone = () => {

  return (
    <div className='itemZone'>
      <h1 className='item-zone'>Items on Sale <img src = {fire}/></h1>
      
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