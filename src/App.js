import React from 'react';
import {Routes, Route} from 'react-router-dom'
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import SearchBox from './Components/SearchBox/SearchBox';
import SellBar from './Components/SellBar/SellBar';
import ItemCards from './Components/ItemCards/ItemCards';
import { makeStyles } from '@mui/material';
import ItemZone from './Components/ItemZone/ItemZone';
import CategoryPage from './Components/CategoryPage/CategoryPage';
import Individual from './Components/Individual_Item/Individual';
import Error from './Components/Individual_Item/Error';
function App() {
  return (
    <div className="App">
      <Navbar/>
     <Routes>
      <Route path='/' element={<ItemZone/>}/>
      <Route path='individual' element={<Individual/>}>
        <Route path=':userId' element={<Individual/>}/>
        </Route>
      
      
      <Route path='categories' element={<CategoryPage/>}>
        <Route path=':userId' element={<CategoryPage/>}/>
        </Route>
     </Routes>
      <SellBar/>
      
    </div>
  );
}

export default App;
