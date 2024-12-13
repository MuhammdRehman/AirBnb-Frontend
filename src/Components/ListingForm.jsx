import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/ListingsForm.css';

const ListingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    summary: '',
    property_type: '',
    bedrooms: 0,
    bathrooms: 0,
    price: 0,
    guests: 1,
    address: {
      street: '',
      city: '',
      country: '',
    },
    amenities: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === 'images') {
        formData.images.forEach((file) => data.append('images', file));
      } else if (key === 'address') {
        data.append('address', JSON.stringify(formData.address));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post('http://localhost:3001/api/admin/listings', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Listing created successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <h1>List Your Property</h1>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <textarea name="summary" placeholder="Summary" onChange={handleChange} required />
      <input type="text" name="property_type" placeholder="Property Type" onChange={handleChange} required />
      <input type="number" name="bedrooms" placeholder="Bedrooms" onChange={handleChange} required />
      <input type="number" name="bathrooms" placeholder="Bathrooms" onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
      <input type="number" name="guests" placeholder="Guests" onChange={handleChange} required />
      <div className="form-fieldset">
        <div className='form-legend'>
          <input type="text" name="address.street" placeholder="Street" onChange={handleChange} required />
          <input type="text" name="address.city" placeholder="City" onChange={handleChange} required />
          <input type="text" name="address.country" placeholder="Country" onChange={handleChange} required />
        </div>
      </div>
      <input type="text" name="amenities" placeholder="Amenities (comma-separated)" onChange={handleChange} required />
      <input type="file" name="images" multiple accept="image/*" onChange={handleImageChange} required />
      <button type="submit">List Property</button>
    </form>
  );
};

export default ListingForm;
