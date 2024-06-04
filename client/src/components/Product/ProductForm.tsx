import React, { useState } from 'react';
import axios from 'axios';
import './ProductForm.css'; 

const ProductForm: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('/api/products', { name, price, description });
      setName('');
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  return (
    <div className="edit-form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
        </label>
        <br />
        <div className="button-group">
          <button type="submit" className="btn-submit">Add</button>
          <button type="button" className="btn-cancel" onClick={() => { setName(''); setPrice(''); setDescription(''); }}>Clear</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
