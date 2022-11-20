import React from 'react';
import Grid from '@mui/material/Grid';
import dataItem from '../Data.json';
import ItemCards from '../ItemCards/ItemCards';
import './CategoryPage.css';
import {useParams} from 'react-router-dom'
const CategoryPage = () => {
  const {userId} = useParams();
  return (
    <div className='category-page'>
        <h1 className='category-title'>Items related to {userId}</h1>
         <Grid container spacing={4}>
        {
            dataItem.map(data=>{
              if(userId == data.category)
                return  <Grid item xs = {12} sm={6} md={3}><ItemCards id={data.id} img={data.images[0]} title={data.title}/></Grid>
        
            })
        }

        </Grid>
    </div>
    
  )
}

export default CategoryPage