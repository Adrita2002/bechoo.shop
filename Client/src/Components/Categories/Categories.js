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
  useEffect(() => {
    (async () => {
      axios
        .get("http://localhost:8000/products/get/category")
        .then((res) => {
          console.log(res.data.array);
          // let cnt = 0;
          let cate = [];
          res.data.map((data) => {
            let obj = {
              label: data,
              value: data,
            };
            cate.push(obj);
            // cnt = cnt + 1;
          });
          setCategory(cate);
          console.log(category, "category");
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);
  const [selectedOption, setSelectedOption] = useState();

  const handleOptionChange = (event, newValue) => {
    setSelectedOption(newValue);
    console.log(selectedOption, "...option");
  };

  const navigate = useNavigate();
  return (
    <div className="categories">
      <Autocomplete
        className="category"
        options={category}
        getOptionLabel={(option) => option.label}
        value={selectedOption}
        onChange={handleOptionChange}
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
