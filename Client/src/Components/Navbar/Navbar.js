import React,{useState, useEffect} from 'react';
import axios from 'axios';
import SearchBox from '../SearchBox/SearchBox'
import Fab from '@mui/material/Fab';
import ItemData from "../Data.json";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Categories from '../Categories/Categories';
import Badge from '@mui/material/Badge';
import './Navbar.css'
const Navbar = () => {
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    const token = localStorage.getItem('token')
		if (token) {
			(async () => {
			axios.get('/user/info',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then(res=>{
        if(res.data.data){
          console.log(res.data.data);
          setUserDetails(res.data.data);
        }
      })
			})();
		}
	}, []);
  return (
    <div className='nav-wrapper'>
    <div className="navbar">
        <div className='logo'>Bechoo</div>
        <SearchBox placeholder='Search for items...' data={ItemData}/>
       
        <div className='btn-wrapper'>
        <Badge badgeContent={4} color="secondary">
  <ChatBubbleOutlineIcon color="white" />
</Badge>

        <Badge badgeContent={4} color="secondary">
  <ShoppingCartIcon color="white" />
</Badge>
        <div className='account'>
          {userDetails.name}
        </div>
           
       </div>
   
    </div>
    <Categories data={ItemData}/>
    </div>
  )
}

export default Navbar