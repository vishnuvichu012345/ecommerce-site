import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductList from './components/ProductList';
import AddToCart from './components/AddToCart';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

class App extends React.Component {
  state = {
    selectedCategory: '',
    isSidebarOpen: false,
  };

  handleCategoryChange = (category) => {
    this.setState({ selectedCategory: category });
  };

  toggleSidebar = () => {
    this.setState(prevState => ({ isSidebarOpen: !prevState.isSidebarOpen }));
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar 
            onCategoryChange={this.handleCategoryChange} 
            toggleSidebar={this.toggleSidebar}
          />
          <Sidebar 
            onCategoryChange={this.handleCategoryChange} 
            isOpen={this.state.isSidebarOpen}
            toggleSidebar={this.toggleSidebar}
          />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<ProductList selectedCategory={this.state.selectedCategory} />} />
              <Route path="/sort" element={<ProductList selectedCategory={this.state.selectedCategory} />} />
              <Route path="/cart" element={<AddToCart />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;