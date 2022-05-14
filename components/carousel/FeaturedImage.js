import React from "react";
import styles from "./car.module.css";
const FeaturedImage = ({ items, currentIndex }) => {
  return (
    <div className={styles.featured_wrapper}>
      <img src={items[currentIndex]} alt="Product" />
    </div>
  );
};

export default FeaturedImage;
