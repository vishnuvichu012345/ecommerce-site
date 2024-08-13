import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/actions/cartActions';
import './AddToCart.css';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';

class AddToCart extends React.Component {
  handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      this.props.updateQuantity(id, quantity);
    }
  };

  handleRemove = (id) => {
    this.props.removeFromCart(id);
  };

  render() {
    const { cart } = this.props;
    console.log("cart==========", cart);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalCost = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const deliveryCharge = totalCost > 1999 ? 0 : 50;
    const grandTotal = totalCost + deliveryCharge;

    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Your Shopping Bag is empty!</p>
            <p>Sign in to save or access already saved items in your shopping bag.</p>
            <button className="sign-in-btn">Sign in</button>
          </div>
        ) : (
          <div className="cart-details">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Size: {item.size}</p>
                  <div className="quantity-controls">
                    <button onClick={() => this.handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => this.handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => this.handleRemove(item.id)}>Remove</button>
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
            <div className="cart-summary">
              <div className="summary-item">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>
              <div className="summary-item">
                <span>Total:</span>
                <span>${totalCost.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Delivery Charge:</span>
                <span>${deliveryCharge.toFixed(2)}</span>
              </div>
              <div className="summary-item grand-total">
                <span>Grand Total:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
              <div className="cart-info">
                <p>Free shipping above ₹1999</p>
                <p>Estimated delivery time: 2-7 days</p>
                <p>Free & flexible 15 days return</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { cart } = state.cart;
  return { cart };
};

export default connect(mapStateToProps, { removeFromCart, updateQuantity })(AddToCart);
