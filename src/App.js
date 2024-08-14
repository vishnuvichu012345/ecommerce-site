import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductList from './components/ProductList';
import AddToCart from './components/AddToCart';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <Router>
      <div className="App">
        <Navbar 
          onCategoryChange={handleCategoryChange} 
          toggleSidebar={toggleSidebar}
        />
        <Sidebar 
          onCategoryChange={handleCategoryChange} 
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<ProductList selectedCategory={selectedCategory} />} />
            <Route path="/sort" element={<ProductList selectedCategory={selectedCategory} />} />
            <Route path="/cart" element={<AddToCart />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
