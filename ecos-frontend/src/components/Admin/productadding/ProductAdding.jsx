import React, { useState } from 'react';
import axios from 'axios';
import { MdTitle, MdOutlineInventory2 } from "react-icons/md"
import { BsBodyText } from "react-icons/bs"
import { TbBrandAsana, TbCategory } from "react-icons/tb"
import { ImPriceTag } from "react-icons/im"
import { BiImages } from "react-icons/bi"

import "./ProductAdding.css";

export default function ProductAdding() {

  const [product, setProduct] = useState({ 
    title: '', 
    description: '', 
    brand: '', 
    price: '0', 
    image: null, 
    category: 'Collections', 
    countInStock: '0' 
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', product.name);
    formData.append('description', product.description);
    formData.append('brand', product.brand);
    formData.append('category', product.category);
    formData.append('price', product.price);
    formData.append('countInStock', product.countInStock);
    formData.append('image', product.image);

    try {
      const response = await axios.post('http://localhost:3000/api/admin/productuploadtry', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Clear the form or redirect to a different page
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div className='container' id='main-div'>
      <h2>Upload Your Product</h2>
      <form onSubmit={handleSubmit} id='prod-form'>
        <div className='input-div'>
            <MdTitle className="icons" />
            <input type="text" className='form-control' name="name" placeholder="Product Title" onChange={handleInputChange} />
        </div>
        <div className='input-div'>
            <BsBodyText className="icons" />
            <input type="text" className='form-control' name="description" placeholder="Product Description" onChange={handleInputChange} />
        </div>
        <div className='input-div'>
            <TbBrandAsana className="icons" />
            <input type="text" className='form-control' name="brand" placeholder="Product Brand" onChange={handleInputChange} />
        </div>
        <div className='input-div'>
            <TbCategory className="icons" />
            <input type="text" className='form-control' name="category" placeholder="Product Category" onChange={handleInputChange} />
        </div>
        <div className='input-div'>
            <ImPriceTag className="icons" />
            <input type="number" className='form-control' name="price" placeholder="Product Price" onChange={handleInputChange} />
        </div>
        <div className='input-div'>
            <MdOutlineInventory2 className="icons" />
            <input type="number" className='form-control' name="countinstock" placeholder="Count in Stock" onChange={handleInputChange} />
        </div>
        <div className='input-div'>
            <BiImages className="icons" />
            <input type="file" className='form-control' name="image" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" className='btn btn-primary' id='submit-btn'>Upload</button>
      </form>
    </div>
  );
};
