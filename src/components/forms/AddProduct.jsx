import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { ThreeDots } from 'react-loader-spinner';

const inputStyle = { border: '1px solid black' };

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestSeller = (event) => {
    const value = event.target.value === 'true';
    setBestSeller(value);
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginToken = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('firmId');

      if (!loginToken || !firmId) {
        console.error("user not authenticated");
      }

      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('bestSeller', bestSeller);
      formData.append('image', image);

      category.forEach((value) => {
        formData.append('category', value);
      });

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      if (response.ok) {
        alert('✅ Product added successfully!');
      }
      setProductName("");
      setPrice("");
      setCategory([]);
      setBestSeller(false);
      setImage(null);
      setDescription("");

    } catch (error) {
      alert('❌ Failed to add Product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      {loading && (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <ThreeDots 
              height="80" 
              width="80" 
              color="#f56f42" 
              ariaLabel="three-dots-loading"
              visible={true}
            />
          <p>⏳ Please wait, your product is being added...</p>
        </div>
      )}
      {!loading && (
        <form className="form-group" onSubmit={handleAddProduct}>
          <h3 className="text-center mb-4">🛍️ Add Product</h3>
          
          <div className="mb-3">
            <label className="form-label">🛒 Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="form-control"
              style={inputStyle}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">💰 Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control"
              style={inputStyle}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">🍲 Category</label>
            <div className="form-check">
              <input
                type="checkbox"
                value="veg"
                checked={category.includes('veg')}
                onChange={handleCategoryChange}
                className="form-check-input"
              />
              <label className="form-check-label">Veg 🥦</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                value="non-veg"
                checked={category.includes('non-veg')}
                onChange={handleCategoryChange}
                className="form-check-input"
              />
              <label className="form-check-label">Non-Veg 🍗</label>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">🔥 Best Seller</label>
            <div className="form-check">
              <input
                type="radio"
                value="true"
                checked={bestSeller === true}
                onChange={handleBestSeller}
                className="form-check-input"
              />
              <label className="form-check-label">Yes ✅</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                value="false"
                checked={bestSeller === false}
                onChange={handleBestSeller}
                className="form-check-input"
              />
              <label className="form-check-label">No ❌</label>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">📝 Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              style={inputStyle}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">🖼️ Firm Image</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="form-control"
              style={inputStyle}
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">📤 Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddProduct;
