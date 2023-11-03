import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./updateProduct.css";
import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function UpdateProduct() {

    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const location = useLocation();
    const productId = location.pathname.split("/")[2];

    const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
    );

    const handleClick = (e) => {
        e.preventDefault();
        // connect to the firebase
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
    
            // ...
    
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const product = { ...inputs, img: downloadURL};
            updateProduct(product, dispatch);
            alert("Product updated!")
          });
        }
        );
    };

  return (
    <div className="newProduct">
      <div className="formContainer">
        <span className="addProductTitle">Update Product</span>
        <form className="addProductForm">
          <div className="addProductItem">
            <label>Image</label>
            <div className="imageContainer">
                <img src= {product.img} alt="" className="productImg" />
            </div>
            
            <input
              type="file"
              id="file"
              className="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Title</label>
            <input
              name="title"
              type="text"
              placeholder={product.title}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <textarea
              name="desc"
              type="text"
              className="desc"
              placeholder={product.desc}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Price</label>
            <input
              name="price"
              type="number"
              placeholder={product.price}
              onChange={handleChange}
            />
          </div>
          {/* <div className="addProductItem">
            <label>Categories</label>
            <input
              type="text"
              placeholder="jeans, skirts"
              onChange={handleCat}
            />
          </div> */}
          <div className="addProductFormSub">
              <div className="addProductItem">
                <label>Category</label>
                <select name="categories" onChange={handleChange}>
                  <option value="women">Women</option>
                  <option value="men">Men</option>
                </select>
              </div>

              <div className="addProductItem">
                <label>Size</label>
                <select name="size" onChange={handleChange}>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
          </div>
          <div className="addProductFormSub">
              <div className="addProductItem">
                <label>Color</label>
                <select name="color" onChange={handleChange}>
                  <option value="White">White</option>
                  <option value="Black">Black</option>
                  <option value="Brown">Brown</option>
                  <option value="Gray">Gray</option>
                </select>
              </div>
              
              <div className="addProductItem">
                <label>Stock</label>
                <select name="inStock" onChange={handleChange}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
          </div>
          <button onClick={handleClick} className="addProductButton">Update Product</button>
        </form>
      </div>
    </div>
  )
}
