import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import ProductCard from './ProductCard';
import './ProductList.css';

class ProductList extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { products, loading, error, selectedCategory } = this.props;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const filteredProducts = selectedCategory
      ? products.filter(product => product.category === selectedCategory)
      : products;

    return (
      <div className="product-list">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.product.products,
  loading: state.product.loading,
  error: state.product.error,
});

export default connect(mapStateToProps, { fetchProducts })(ProductList);
