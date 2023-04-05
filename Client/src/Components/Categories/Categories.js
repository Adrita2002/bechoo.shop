import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./Categories.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const Categories = ({ data }) => {
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState();
  const [selectedOption, setSelectedOption] = useState('');

  const isOptionEqualToValue = (option, value) => {
    return option.value === value.value;
  };

  useEffect(() => {
    (async () => {
      axios
        .get("http://localhost:8000/products/get/category")
        .then((res) => {
          console.log(res.data, 'res.data');
          setCategory(res.data);
          const categories = [];
          res.data.forEach(category => {
            let obj = {
              label : category,
              value: category
            }
            categories.push(obj);
          });
          setCategory(categories);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  const handleOptionChange = (event, newValue) => {
    if(newValue){
      setSelectedOption(newValue.value);
    }else {
      setSelectedOption();
    }
  };

  const navigate = useNavigate();

  console.log(selectedOption, 'selected option');

  return (
    <div className="categories">
      <Autocomplete
        className="category"
        options={category}
        getOptionLabel={(option) => option.label}
        onChange={handleOptionChange}
        isOptionEqualToValue={isOptionEqualToValue}
        renderInput={(params) => (
          <TextField {...params} label="Select an option" variant="outlined" />
        )}
      />
    </div>
  );
};

export default Categories;
/*
import React, { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

const options = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
];

function MyAutocomplete() {


  return (
   
  );
} */
