import React from "react";
import styles from "./reportSubmitted.module.css";
//Link used to route to another page
import Link from "next/link";

//message to display once the report has been successfully submitted
const ReportSubmitted = () => {
  return (
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
  );
};

export default ReportSubmitted;
