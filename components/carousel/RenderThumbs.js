import React from "react";
import styles from "./car.module.css";
// Thumbnails
const RenderThumbs = ({ items, slideNext, slidePrev, slideTo }) => (
  <ul className={styles.thumb_list}>
    <span className={styles.chevLeft} onClick={slidePrev}>
      👈
    </span>
    <span className={styles.chevRight} onClick={slideNext}>
      👉
    </span>
    {items.map((item, i) => (
      <li className={styles.thumb} key={i} onClick={() => slideTo(i)}>
        <img src={item} className={styles.img} />
      </li>
    ))}
  </ul>
);

export default RenderThumbs;
