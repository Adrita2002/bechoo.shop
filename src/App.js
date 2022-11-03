import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import SearchBar from './Components/SearchBar/SearchBar';
import ItemCard from './Components/ItemCard/ItemCard';
function App() {
  return (
    <div className="App">
      <SearchBar/>
      <h2 className='item-title'>Recommended Items</h2>
      <div className='items'>
      <ItemCard/>
      <ItemCard/>
      <ItemCard/>
      <ItemCard/>

      </div>
      <h2 className='item-title'>Latest Items</h2>
      <div className='items items-bottom'>
      <ItemCard/>
      <ItemCard/>
      <ItemCard/>
      <ItemCard/>
      </div>
     <Navbar/>
     

    </div>
  );
}

export default App;
