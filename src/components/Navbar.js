import React from 'react';
import './Navbar.css';

class Navbar extends React.Component {
  handleCategoryChange = (category) => {
    // Call the function passed from parent to update the selected category
    this.props.onCategoryChange(category);
  };

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">E-Shop</div>
        <div className="navbar-links">
          <a href="/">Home</a>
          <div className="dropdown">
            <button className="dropbtn">Categories</button>
            <div className="dropdown-content">
              <button onClick={() => this.handleCategoryChange('men\'s clothing')}>Men's Clothing</button>
              <button onClick={() => this.handleCategoryChange('women\'s clothing')}>Women's Clothing</button>
              <button onClick={() => this.handleCategoryChange('jewelery')}>Jewelery</button>
              <button onClick={() => this.handleCategoryChange('electronics')}>Electronics</button>
            </div>
          </div>
          <a href="/products">Products</a>
          <a href="/cart">Cart</a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
