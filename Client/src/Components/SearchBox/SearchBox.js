import React,{useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './SearchBox.css'
const SearchBox = ({placeholder, data}) => {
  const [filteredData, setFilteredData] = useState([]);
  const handleFilter=(e)=>{
    const searchWord = e.target.value;
    const newFilter = data.filter((value)=>{
      return value.title.toLowerCase().includes(searchWord.toLowerCase())
    })
    if(searchWord==="")setFilteredData([])
    else setFilteredData(newFilter)
  }
 
  return (
    <div className='search'>
        <div className='searchInputs'>
            <input type='text' 
            className='search-box'placeholder={placeholder} onChange={handleFilter}/>
            <div className='searchIcon'>
            <SearchIcon/>
            </div>
        </div>
        {filteredData.length!=0 &&(
        <div className='dataResult'>
          {
            filteredData.slice(0,15).map((val, key)=>{
              console.log(val.title)
              return <div className='dataItem'><p>{val.title}</p></div>
            })
          }
        </div>
        )
        }
    </div>
  )
}

export default SearchBox