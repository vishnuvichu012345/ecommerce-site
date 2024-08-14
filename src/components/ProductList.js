import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import ProductCard from './ProductCard';
import Banner from './Banner';
import './ProductList.css';

const ProductList = ({ products, loading, error, selectedCategory, fetchProducts }) => {

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const isFiltered = selectedCategory && filteredProducts.length > 0;

  return (
    <div>
      <Banner />
      <div className="product-list-container">
        <h2 className="product-list-title">
        {isFiltered ? `Products in ${selectedCategory}` : 'New Arrivals View All'}
        </h2>
        {filteredProducts.length === 0 && selectedCategory ? (
          <p className="no-products-message">No products found in this category.</p>
        ) : (
          <div className="product-list">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  products: state.product.products,
  loading: state.product.loading,
  error: state.product.error,
});

export default connect(mapStateToProps, { fetchProducts })(ProductList);