import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBox.css";
import axios from "axios";
const SearchBox = ({ placeholder }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    (async () => {
      axios
        .get("http://localhost:8000/products/get")
        .then((res) => {
          console.log(res.data);
          let prod = res.data;
          setProduct(prod);
          console.log(product, "....product");
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    const newFilter = product.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") setFilteredData([]);
    else setFilteredData(newFilter);
  };

  const handleClick = (id) => {
    navigate(`/individual/${id}`);
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          className="search-box"
          placeholder={placeholder}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          <SearchIcon onClick={handleClick} />
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 5).map((val, key) => {
            // console.log(val.name);
            return (
              <div className="dataItem">
                <p onClick={() => handleClick(val._id)}>{val.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
