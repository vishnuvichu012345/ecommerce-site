import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/actions/cartActions'; // Ensure this path is correct
import './AddToCart.css';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';

class AddToCart extends React.Component {
  handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      this.props.updateQuantity(id, quantity); // Update quantity in the cart
    }
  };

  handleRemove = (id) => {
    this.props.removeFromCart(id); // Remove item from the cart
  };

  render() {
    const { cart } = this.props;
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
      <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <p>Size: {item.size}</p>
                <div>
                  <button onClick={() => this.handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => this.handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => this.handleRemove(item.id)}>Remove</button>
                <div className="share-buttons">
                  <FacebookShareButton url={window.location.href} quote={`${item.title} - Check it out!`}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={window.location.href} title={`${item.title} - Check it out!`}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
        </div>
      )}
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart || [],
});

export default connect(mapStateToProps, { removeFromCart, updateQuantity })(AddToCart);
