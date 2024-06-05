import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchVisible, setSearchVisible] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();

  }, []);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setSearchVisible(false); //Hide search input
  };

  const handleDelete = async (productId: string) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
      setSuccessMessage('Product deleted successfully!');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      setError('Error deleting product');
      console.error('Error deleting product:', err);
    }
  };

  const handleSave = async () => {
    if (editingProduct) {
      try {
        await axios.put(`/api/products/${editingProduct._id}`, editingProduct);
        //Clear the form first
        setEditingProduct(null); 
        //Update state directly to reflect changes
        setProducts(products.map(p => p._id === editingProduct._id ? editingProduct : p));
        setSuccessMessage('Product updated successfully!');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } catch (err) {
        setError('Error updating product');
        console.error('Error updating product:', err);
      }
    }
    setSearchVisible(true); //Show search input
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      {searchVisible && (
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="form-control"
          />
          {searchQuery && (
            <button onClick={clearSearch} className="btn-clear">Clear</button>
          )}
        </div>
      )}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {editingProduct ? (
        <div className="edit-form">
          <h2>Edit Product</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <label>
              Name:
              <input 
                type="text" 
                value={editingProduct.name} 
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} 
                className="form-control"
              />
            </label>
            <br />
            <label>
              Price:
              <input 
                type="number" 
                value={editingProduct.price} 
                onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })} 
                className="form-control"
              />
            </label>
            <br />
            <label>
              Description:
              <input 
                type="text" 
                value={editingProduct.description} 
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} 
                className="form-control"
              />
            </label>
            <br />
            <div className="button-group">
              <button type="button" className="btn-submit" onClick={handleSave}>Save</button>
              <button type="button" className="btn-cancel" onClick={() => {setEditingProduct(null); setSearchVisible(true);}}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <ul className="product-list">
          {filteredProducts.map((product) => (
            <li key={product._id}>
              <div className="product-info">
                {product.name} - ${product.price.toFixed(2)}
                <br />
                {product.description}
              </div>
              <div className="button-container">
                <button onClick={() => handleEdit(product)} className="btn-submit">Edit</button>
                <button onClick={() => handleDelete(product._id)} className="btn-delete">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
