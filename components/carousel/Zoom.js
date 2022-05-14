import React from "react";
import styles from "./car.module.css";
import {
  BsArrowLeft,
  BsArrowRight,
  BsEye,
  AiOutlineDownload,
} from "react-icons/bs";
const Zoom = ({ handleEnlargeClick }) => {
  return (
    <div className={styles.zoom_container}>
      <span onClick={handleEnlargeClick}>
        <BsEye />
        <span className={styles.view_image}>View Image</span>
      </span>
    </div>
  );
};

export default Zoom;
