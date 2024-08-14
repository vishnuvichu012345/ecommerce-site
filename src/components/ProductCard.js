import React, { useState } from 'react';
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

const ProductCard = ({ product, addToCart }) => {
  const [showMore, setShowMore] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddToCart = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = (confirm) => {
    if (confirm) {
      console.log('Confirmed adding product to cart:', product);
      addToCart(product);
    }
    setDialogOpen(false);
  };

  const toggleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const toggleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  const renderRating = () => {
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

  const truncatedTitle =
    product.title.length > 50 && !showMore
      ? product.title.substring(0, 50) + '...'
      : product.title;

  return (
    <div className="product-card">
      <button
        className={`heart-button ${isLiked ? 'liked' : ''}`}
        onClick={toggleLike}
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
        <button className="more-button" onClick={toggleShowMore}>
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
      <p>${product.price}</p>
      {renderRating()}
      <button onClick={handleAddToCart}>Add to Cart</button>

      {/* Confirmation Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => handleDialogClose(false)}
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
          <Button onClick={() => handleDialogClose(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDialogClose(true)}
            color="primary"
            autoFocus
          >
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => {
    console.log('Dispatching addToCart action with product:', product);
    dispatch(addToCart(product));
  },
});

export default connect(null, mapDispatchToProps)(ProductCard);
