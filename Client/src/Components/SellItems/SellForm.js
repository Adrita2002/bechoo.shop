import React,{useState,useEffect} from 'react'
import './SellForm.css'
import TextField from '@mui/material/TextField'
import  { Card,CardContent, Grid, Button } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import dataItem from '../Data.json'

const SellForm = () => {
  const uniqueCategory = []
  dataItem.map(datum=>{
      if (uniqueCategory.indexOf(datum.category)===-1){
          uniqueCategory.push(datum.category)
      }
  })
  uniqueCategory.push('Other')
  const [category, setCategory] = useState('smartphones');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
    
  return (
    <div className='sell-form'>
        <h1>Please Fill the Form Below</h1>
        <Card>
          <CardContent>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField label="Item Name" placeholder="Enter Item Name" variant="outlined" fullWidth required/>
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField label="Item Price" placeholder="Enter Item Price" variant="outlined" fullWidth required/>
              </Grid>
              <Grid xs={12} sm={12} item>
                <TextField label="Item Description" placeholder="Enter Item Description" variant="outlined" multiline 
                rows={4} fullWidth required/>
              </Grid>
              
              <Grid xs={12} sm={6} item>
                <TextField label="Item Brand" placeholder="Enter Brand Name" variant="outlined" fullWidth/>
              </Grid>
              <Grid xs={12} sm={6} item>
              <TextField
          id="outlined-select-currency"
          select
          label="Item Category"
          value={category}
          onChange={handleChange}
          helperText="Please select the category" fullWidth required
        >
          {uniqueCategory.map((option) => (
            <MenuItem value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField label="Category Name" placeholder="If Other, Enter Category Name" variant="outlined" fullWidth/>
              </Grid>
              <Grid xs={12} sm={6} item>
                <label>Upload Item Images *</label>
                <br/>
              <input id='file-input' type="file" multiple accept="image/*" required fullWidth/>
              </Grid>
              <Grid xs={12} sm={6} item>
              <Button className="submit-btn" variant="contained" component="label">Submit</Button>
              </Grid>
              
            </Grid>
            
          </CardContent>
        </Card>
    </div>
  )
}

export default SellForm