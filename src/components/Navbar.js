import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onCategoryChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCategoryChange = (category) => {
    onCategoryChange(category);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={`navbar ${isDropdownOpen ? 'blurred' : ''}`}>
      <div className="navbar-brand">
        <i className="fas fa-store"></i> E-Shop
      </div>
      <div className="navbar-links">
        <a href="/">
          <i className="fas fa-home"></i> Home
        </a>
        <div className="dropdown">
          <button className="dropbtn" onClick={toggleDropdown}>
            <i className="fas fa-list"></i> Categories
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <button onClick={() => handleCategoryChange("men's clothing")}>
                <i className="fas fa-male"></i> Men's
              </button>
              <button onClick={() => handleCategoryChange("women's clothing")}>
                <i className="fas fa-female"></i> Women's
              </button>
              <button onClick={() => handleCategoryChange('jewelery')}>
                <i className="fas fa-gem"></i> Jewelery
              </button>
              <button onClick={() => handleCategoryChange('electronics')}>
                <i className="fas fa-tv"></i> Electronics
              </button>
            </div>
          )}
        </div>
        <a href="/products">
          <i className="fas fa-box-open"></i> Products
        </a>
        <a href="/cart">
          <i className="fas fa-shopping-cart"></i> Cart
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
