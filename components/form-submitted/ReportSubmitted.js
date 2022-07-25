import React from "react";
import styles from "./reportSubmitted.module.css";
import { Link } from "react-router-dom";

const ReportSubmitted = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>AIVARA</p>
      </div>
      <div className={styles.body}>
        <p>Your report has been submitted</p>
        <p>
          Track under review section&nbsp;
          <span>
            <Link className={styles.sectionLink} to="/section">
              link
            </Link>
          </span>
        </p>
        <Link to="/" className={styles.link}>
          back to dashboard
        </Link>
      </div>
    </div>
  );
};

export default ReportSubmitted;
