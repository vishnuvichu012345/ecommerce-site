import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Sidebar = ({ onCategoryChange, cartItemCount, isOpen, toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCategoryChange = (category) => {
    onCategoryChange(category);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        <i className="fas fa-times"></i>
      </button>
      <div className="sidebar-brand">
        <i className="fas fa-store"></i> E-Shop
      </div>
      <div className="sidebar-links">
        <Link to='/'>
          <a>
            <i className="fas fa-home"></i> Home
          </a>
        </Link>
        <Link to='/sort'>
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
        </Link>
        <Link to='/cart'>
          <a className="cart-link">
            <i className="fas fa-shopping-cart"></i> Cart
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </a>
        </Link>
      </div>
    </div>
  );
};

// Map state from Redux store to component props
const mapStateToProps = (state) => {
  const cart = state.cart ? state.cart.cart : [];
  return {
    cartItemCount: cart.reduce((total, item) => total + item.quantity, 0),
  };
};

export default connect(mapStateToProps)(Sidebar);
