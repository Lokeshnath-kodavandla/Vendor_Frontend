import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { BeatLoader } from 'react-spinners';

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        console.error("User not authenticated");
      }

      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image', file);

      category.forEach((value) => {
        formData.append('category', value);
      });
      region.forEach((value) => {
        formData.append('region', value);
      });

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: {
          'token': `${loginToken}`
        },
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
        alert("✅ Firm added Successfully!");
      } else if (data.message === "vendor can have only one firm") {
        alert("⚠️ Firm Exists 🥗. Only 1 firm can be added.");
      } else {
        alert("❌ Failed to add Firm.");
      }

      const mango = data.firmId;
      const vendorRestuarant = data.vendorFirmName;
      localStorage.setItem('firmId', mango);
      localStorage.setItem('firmName', vendorRestuarant);
      window.location.reload();

    } catch (error) {
      console.error("failed to add Firm");
      alert("❌ Failed to add Firm.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      {loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
           <BeatLoader loading={loading} size={20} color="#4fa94d" />
        </div>
      )}

      {!loading && (
        <form className="p-4 border rounded shadow bg-light" onSubmit={handleFirmSubmit}>
          <h3 className="text-center mb-4">🏢 Add Firm</h3>

          <div className="mb-3">
            <label className="form-label">🏷️ Firm Name</label>
            <input type="text" className="form-control" name='firmName' value={firmName} onChange={(e) => setFirmName(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">📍 Area</label>
            <input type="text" className="form-control" name='area' value={area} onChange={(e) => setArea(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">🍱 Category</label>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" checked={category.includes('veg')} value="veg" onChange={handleCategoryChange} />
              <label className="form-check-label">Veg 🥗</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange} />
              <label className="form-check-label">Non-Veg 🍗</label>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">🎁 Offer</label>
            <input type="text" className="form-control" name='offer' value={offer} onChange={(e) => setOffer(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">🌍 Region</label>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange} />
              <label className="form-check-label">South Indian 🍛</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange} />
              <label className="form-check-label">North Indian 🍲</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange} />
              <label className="form-check-label">Chinese 🍜</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange} />
              <label className="form-check-label">Bakery 🧁</label>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">🖼️ Firm Image</label>
            <input type="file" className="form-control" onChange={handleImageUpload} />
          </div>

          <div className="text-center">
            <button type='submit' className="btn btn-success">Submit ✅</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddFirm;
