import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css';
import ProductForm from './components/Product/ProductForm';
import ProductList from './components/Product/ProductList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Tabs>
          <TabList>
            <Tab>Add Product</Tab>
            <Tab>Product List</Tab>
          </TabList>
          <TabPanel>
            <ProductForm />
          </TabPanel>
          <TabPanel>
            <ProductList />
          </TabPanel>
        </Tabs>
      </header>
    </div>
  );
}

export default App;
