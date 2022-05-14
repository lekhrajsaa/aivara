import React from "react";
import AliceCarousel from "react-alice-carousel";
import styles from "./car.module.css";
const RenderGallery = ({ currentIndex, items, onSlideChanged, responsive }) => {
  return (
    <AliceCarousel
      dotsDisabled={false}
      buttonsDisabled={true}
      slideToIndex={currentIndex}
      onSlideChanged={onSlideChanged}
      responsive={responsive}
    >
      {items.map((item, i) => (
        <div key={i} className={styles.wrapper}>
          <img src={item} />
        </div>
      ))}
    </AliceCarousel>
  );
};

export default RenderGallery;
