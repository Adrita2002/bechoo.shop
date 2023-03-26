import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SellForm.css";
import TextField from "@mui/material/TextField";
import { Card, CardContent, Grid, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import dataItem from "../Data.json";

const SellForm = () => {
  const [userId, setUserId] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      (async () => {
        axios
          .get("/user/info", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.data.data) {
              // console.log(res.data.data);
              setUserId(res.data.data._id);
            }
          });
      })();
    }
  }, []);
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({
    userId: "",
    name: "",
    price: "",
    desc: "",
    brand: "",
    category: "",
    other: "",
  });

  const [fileList, setFileList] = useState(null);
  const uniqueCategory = [];
  dataItem.map((datum) => {
    if (uniqueCategory.indexOf(datum.category) === -1) {
      uniqueCategory.push(datum.category);
    }
  });
  uniqueCategory.push("Other");
  const [category, setCategory] = useState("smartphones");

  const handleChange = (event) => {
    setCategory(event.target.value);
    setProductDetails({ ...productDetails, category: event.target.value });
  };

  const handleFileUpload = (e) => {
    setFileList(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileList) {
      return;
    }

    const finalImageUrls = [];

    await Promise.all(
      Array.from(fileList).map(async (file, i) => {
        const resp = await axios.post("/s3Url", {
          fileExtension: file.name.split(".")[1],
          contentType: file.type,
        });
        const url = resp.data.url;
        const config = {
          method: "put",
          url: url,
          headers: {
            "Content-Type": file.type,
          },
          data: file,
        };

        const response = await axios(config);

        if (response.status === 200) {
          const finalUrl = url.split("?")[0];
          finalImageUrls.push(finalUrl);
        }
      })
    );

    if (finalImageUrls.length >= 1) {
      const sellingProduct = await axios.post("/productdetails", {
        userId: productDetails.userId,
        name: productDetails.name,
        price: productDetails.price,
        desc: productDetails.desc,
        brand: productDetails.brand,
        category: productDetails.category,
        other: productDetails.other,
        images: finalImageUrls,
      });
      if (sellingProduct.status === 201 || sellingProduct.status === 200) {
        // success page, redirect to next page
        navigate("/");
      }
    }
  };

  return (
    <div className="sell-form">
      <h1>Please Fill the Form Below</h1>
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid xs={12} sm={6} item>
              <TextField
                label="Item Name"
                placeholder="Enter Item Name"
                value={productDetails.name}
                onChange={(e) =>
                  setProductDetails({ ...productDetails, name: e.target.value })
                }
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                label="Item Price"
                placeholder="Enter Item Price"
                value={productDetails.price}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    price: e.target.value,
                  })
                }
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                label="Item Description"
                placeholder="Enter Item Description"
                value={productDetails.desc}
                onChange={(e) =>
                  setProductDetails({ ...productDetails, desc: e.target.value })
                }
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                required
              />
            </Grid>

            <Grid xs={12} sm={6} item>
              <TextField
                label="Item Brand"
                placeholder="Enter Brand Name"
                value={productDetails.brand}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    brand: e.target.value,
                  })
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id="outlined-select-currency"
                select
                label="Item Category"
                value={category}
                onChange={handleChange}
                helperText="Please select the category"
                fullWidth
                required
              >
                {uniqueCategory.map((option) => (
                  <MenuItem value={option}>{option}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                label="Category Name"
                value={productDetails.other}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    other: e.target.value,
                  })
                }
                placeholder="If Other, Enter Category Name"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <label>Upload Item Images *</label>
              <br />
              <form encType="multipart/form-data">
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="image/*"
                  required
                  fullWidth
                  onChange={handleFileUpload}
                />
              </form>
            </Grid>
            <Grid xs={12} sm={6} item>
              <Button
                className="submit-btn"
                variant="contained"
                onClick={handleSubmit}
                component="label"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellForm;
