import fire from './fire.png';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import SearchBox from './Components/SearchBox/SearchBox';
import SellBar from './Components/SellBar/SellBar';
import ItemCards from './Components/ItemCards/ItemCards';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/material';
import ItemZone from './Components/ItemZone/ItemZone';
function App() {
  return (
    <div className="App">
      <Navbar/>
      
        <h1 className='item-zone'>Items on Sale <img src = {fire}/></h1>
     <ItemZone/>
      <SellBar/>
      
    </div>
  );
}

export default App;
