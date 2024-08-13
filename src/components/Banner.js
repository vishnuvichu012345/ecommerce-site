// Banner.js
import React, { useState, useEffect } from 'react';
import './Banner.css';

const banners = [
  {
    id: 1,
    imageUrl: './Images/shirt.jpg',
    title: 'Exclusive Fashion Sale',
    description: 'Revamp your wardrobe with our Buy One, Get One Free offer on all clothing. From stylish shirts to trendy apparel, find the perfect additions to your collection. This is the perfect time to shop for quality fashion at unbeatable prices!',
    buttonText: 'Shop Now',
  },
  {
    id: 2,
    imageUrl: './Images/watch.jpg',
    title: 'Special Offer on Electronics',
    description: 'Upgrade your style with our exclusive range of watches! Enjoy a massive 50% discount on selected models. Whether you’re looking for a classic design or the latest smartwatch, this is your chance to grab the best deals!',
    buttonText: 'Explore Now',
  },
  {
    id: 3,
    imageUrl: './Images/wDress.jpg',
    title: 'Limited Time Free Shipping',
    description: 'Don’t miss out on our limited-time offer! Enjoy free shipping on all orders over $100. Shop your favorite styles and essentials without worrying about delivery costs. Hurry, this offer won’t last long!',
    buttonText: 'Start Shopping',
  },
];

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const { imageUrl, title, description, buttonText } = banners[currentBanner];

  return (
    <div className="banner">
      <img src={imageUrl} alt={title} className="banner-image" />
      <div className="banner-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <button>{buttonText}</button>
      </div>
    </div>
  );
};

export default Banner;
