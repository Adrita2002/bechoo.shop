import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './SellForm.css'
import TextField from '@mui/material/TextField'
import  { Card,CardContent, Grid, Button } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import dataItem from '../Data.json'

const SellForm = () => {
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({
    name:'',
    price:'',
    desc:'',
    brand:'',
    category:'',
    other:''
  })

  const [imageUrl, setImageUrl] = useState('');
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
    setProductDetails({...productDetails, category:event.target.value});
  };

  // function imageUpload(event){
  //   console.log(event.target.files);
  //   // setProductDetails({...productDetails,image:[...event.target.files]})
  //   setImages(event.target.files[0]);
  //   const formData = new FormData();
  //   formData.append("images", images);
  //   axios.post('/productImages',formData).then(res=>{
  //     console.log(res)
  //   }).catch(err=>console.log(err));
  //   if(event.target.files?.length < 1)alert("You must at a minimum of 1 image")
  //   if(event.target.files.length > 5)alert("You can at 5 images at max")
  // }

  

  async function handleSubmit(e){
    e.preventDefault()
    // axios.post('/productdetails',{
    //   name:productDetails.name,
    //   price:productDetails.price,
    //   desc:productDetails.desc,
    //   brand:productDetails.brand,
    //   category:productDetails.category,
    //   other:productDetails.other,
     
    // }).then(res=>{ 
    //   console.log('Data sent', res);
     
    // }).catch(err=>console.log(err))

    console.log(e.target.files);
  // e.target.files.forEach(element => {
    await axios.post('/s3Url').then(res=>{
      console.log(res.data.url);
      setImageUrl(res.data.url);
    }).catch(err=>console.log(err))
  // });
  // const imageUrl = url.split('?')[0]
  // axios.put(url,imageUrl).then(res=>{
  //   console.log(imageUrl)
  // }).catch(err=>console.log(err))
   
  
  }
    
  return (
    <div className='sell-form'>
        <h1>Please Fill the Form Below</h1>
      
      <Card>
          <CardContent>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField label="Item Name" placeholder="Enter Item Name" value={productDetails.name} onChange={e=>setProductDetails({...productDetails, name:e.target.value})} variant="outlined" fullWidth required/>
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField label="Item Price" placeholder="Enter Item Price"  value={productDetails.price} onChange={e=>setProductDetails({...productDetails, price:e.target.value})} variant="outlined" fullWidth required/>
              </Grid>
              <Grid xs={12} sm={12} item>
                <TextField label="Item Description" placeholder="Enter Item Description"  value={productDetails.desc} onChange={e=>setProductDetails({...productDetails, desc:e.target.value})} variant="outlined" multiline 
                rows={4} fullWidth required/>
              </Grid>
              
              <Grid xs={12} sm={6} item>
                <TextField label="Item Brand" placeholder="Enter Brand Name" value={productDetails.brand} onChange={e=>setProductDetails({...productDetails, brand:e.target.value})} variant="outlined" fullWidth/>
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
                <TextField label="Category Name" value={productDetails.other} onChange={e=>setProductDetails({...productDetails, other:e.target.value})}placeholder="If Other, Enter Category Name" variant="outlined" fullWidth/>
              </Grid>
              <Grid xs={12} sm={6} item>
                <label>Upload Item Images *</label>
                <br/>
              <form encType='multipart/form-data'> 
              <input id='file-input' type="file" multiple accept="image/*" required fullWidth/>
              </form>
              </Grid>
              <Grid xs={12} sm={6} item>
              <Button className="submit-btn" variant="contained" onClick={handleSubmit} component="label">Submit</Button>
              </Grid>
              
            </Grid>
            
          </CardContent>
        </Card>
      
    </div>
  )
}

export default SellForm