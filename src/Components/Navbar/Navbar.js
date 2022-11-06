import React from 'react'
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
  <NotificationsIcon color="white" />
</Badge>
        <Badge badgeContent={4} color="secondary">
  <ShoppingCartIcon color="white" />
</Badge>
        <div className='account'><AccountCircleIcon/>
        <KeyboardArrowDownIcon/></div>
           
       </div>
   
    </div>
    <Categories data={ItemData}/>
    </div>
  )
}

export default Navbar