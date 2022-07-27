import React from "react";
import Link from "next/link";
import styles from "./reportSubmitted.module.css";

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
            <Link href="/section">link</Link>
          </span>
        </p>
        <span className={styles.link}>
          <Link href="/">back to dashboard</Link>
        </span>
      </div>
    </div>
  );
};

export default ReportSubmitted;
