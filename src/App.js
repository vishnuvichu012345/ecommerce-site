import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductList from './components/ProductList';
import AddToCart from './components/AddToCart';
import './App.css';

class App extends React.Component {
  state = {
    selectedCategory: '',
  };

  handleCategoryChange = (category) => {
    this.setState({ selectedCategory: category });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar onCategoryChange={this.handleCategoryChange} />
          <Sidebar onCategoryChange={this.handleCategoryChange} />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<ProductList selectedCategory={this.state.selectedCategory} />} />
              <Route path="/cart" element={<AddToCart />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
