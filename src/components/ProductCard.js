import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import './ProductCard.css';

class ProductCard extends React.Component {
  handleAddToCart = () => {
    const { product, addToCart } = this.props;
    console.log('Attempting to add product to cart:', product);
    addToCart(product);
  };

  render() {
    const { product } = this.props;
    return (
      <div className="product-card">
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <button onClick={this.handleAddToCart}>Add to Cart</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => {
    console.log('Dispatching addToCart action with product:', product);
    dispatch(addToCart(product));
  },
});

export default connect(null, mapDispatchToProps)(ProductCard);