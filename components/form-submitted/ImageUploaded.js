import React from "react";
import styles from "./imageUploaded.module.css";
//Link used to route to another page
import Link from "next/link";

//messages to display once the image has been successfully uploaded
const ImageUploaded = () => {
  return (
    <div className={styles.body}>
      <p>Your images are uploaded,</p>
      <p>Please wait for the analysed images, you will be notified</p>
      <Link href="/home" className={styles.link}>
        back to dashboard
      </Link>
    </div>
  );
};

export default ImageUploaded;
