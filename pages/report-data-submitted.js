import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReportSubmitted from "../components/form-submitted/ReportSubmitted";
import Header from "../components/HeaderConditional";

const ReportDataSubmitted = () => {
  const router = useRouter();
  const [show, setShow] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShow(false);
      router.push("/");
    }
  });
  return (
    <>
      {show && (
        <>
          <Header headerWithSignout={true} />

          <ReportSubmitted />
        </>
      )}
    </>
  );
};

export default ReportDataSubmitted;
