import { selectClasses } from "@mui/material";
import React, { useState } from "react";
import styles from "./car.module.css";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Test from "../test";

const Modal = ({ modal, items, handleModalFalse, currentIndex, featured }) => {
  // const [datalenghtIszreo, setdatalenghtIszreo] = useState();
  // const setclassname = datalenghtIszreo
  //   ? `${styles.hide} ${styles.modal}`
  //   : styles.modal;
  // console.log(setclassname);

  // handleModalFalse = () => {
  //   this.setState({ modal: false });
  // };
  return (
    <div
      className={modal ? styles.modal : styles.hide}
      onClick={handleModalFalse}
    >
      <div className={styles.wrapper}>
        <p className={styles.image_modal_close} onClick={handleModalFalse}>
          Close
        </p>
        <Test imageurl={items[currentIndex]} />
        {/* <img src={items[currentIndex]} className={styles.imgs} /> */}
        <p className={styles.image_modal_title}>
          Lorem ipsum text, some info regarding the bacteria may come here
        </p>
        <p className={styles.image_modal_download}>
          <FileDownloadOutlinedIcon />
          Download
        </p>
      </div>
    </div>
  );
};

export default Modal;
