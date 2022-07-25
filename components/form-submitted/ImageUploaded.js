import React from "react";
import { Link } from "react-router-dom";
import styles from "./imageUploaded.module.css";

const ImageUploaded = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>AIVARA</p>
      </div>
      <div className={styles.body}>
        <p>Your images are uploaded,</p>
        <p> Please wait for the analysed images, you will be notified</p>
        <Link to="/" className={styles.link}>
          back to dashboard
        </Link>
      </div>
    </div>
  );
};

export default ImageUploaded;
