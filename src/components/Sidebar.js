import React from 'react';
import './Sidebar.css'; // Ensure this file exists and contains relevant styles

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <h3>Categories</h3>
        <ul>
          <li><button onClick={() => this.props.onCategoryChange('men\'s clothing')}>Men's Clothing</button></li>
          <li><button onClick={() => this.props.onCategoryChange('women\'s clothing')}>Women's Clothing</button></li>
          <li><button onClick={() => this.props.onCategoryChange('jewelery')}>Jewelery</button></li>
          <li><button onClick={() => this.props.onCategoryChange('electronics')}>Electronics</button></li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
