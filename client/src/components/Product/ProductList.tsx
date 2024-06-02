import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('/api/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
