import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import './ProductCard.css';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      isLiked: false,
      dialogOpen: false, // State to control the dialog visibility
    };
  }

  handleAddToCart = () => {
    this.setState({ dialogOpen: true }); // Open the dialog when "Add to Cart" is clicked
  };

  handleDialogClose = (confirm) => {
    if (confirm) {
      const { product, addToCart } = this.props;
      console.log('Confirmed adding product to cart:', product);
      addToCart(product);
    }
    this.setState({ dialogOpen: false }); // Close the dialog
  };

  toggleShowMore = () => {
    this.setState((prevState) => ({
      showMore: !prevState.showMore,
    }));
  };

  toggleLike = () => {
    this.setState((prevState) => ({
      isLiked: !prevState.isLiked,
    }));
  };

  renderRating = () => {
    const { product } = this.props;
    const { rate, count } = product.rating;
    const filledStars = Math.round(rate);
    const totalStars = 5;

    return (
      <div className="rating">
        {[...Array(totalStars)].map((_, index) =>
          index < filledStars ? (
            <StarIcon key={index} style={{ color: '#ff9800' }} />
          ) : (
            <StarBorderIcon key={index} style={{ color: '#ff9800' }} />
          )
        )}
        <span className="rating-score">{rate} ({count} reviews)</span>
      </div>
    );
  };

  render() {
    const { product } = this.props;
    const { showMore, isLiked, dialogOpen } = this.state;
    const truncatedTitle =
      product.title.length > 50 && !showMore
        ? product.title.substring(0, 50) + '...'
        : product.title;

    return (
      <div className="product-card">
        <button
          className={`heart-button ${isLiked ? 'liked' : ''}`}
          onClick={this.toggleLike}
        >
          {isLiked ? (
            <FavoriteIcon style={{ color: '#ff0000' }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </button>
        <img src={product.image} alt={product.title} />
        <h3>{truncatedTitle}</h3>
        {product.title.length > 50 && (
          <button className="more-button" onClick={this.toggleShowMore}>
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        )}
        <p>${product.price}</p>
        {this.renderRating()}
        <button onClick={this.handleAddToCart}>Add to Cart</button>

        {/* Confirmation Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={() => this.handleDialogClose(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{"Add Product to Cart"}</DialogTitle>
          <DialogContent>
            <div className="dialog-content">
              <img src={product.image} alt={product.title} className="dialog-product-image" />
              <DialogContentText>
                Are you sure you want to add <strong>{product.title}</strong> to your cart?
              </DialogContentText>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDialogClose(false)} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => this.handleDialogClose(true)}
              color="primary"
              autoFocus
            >
              Add to Cart
            </Button>
          </DialogActions>
        </Dialog>
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

const mapStateToProps = (state) => {
  const { cart } = state.cart;
  return { cart };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
