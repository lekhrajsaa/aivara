import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ImageUploaded from "../components/form-submitted/ImageUploaded";
import Header from "../components/HeaderConditional";

const ReportDataUploaded = () => {
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
    <div>
      {show && (
        <>
          <Header headerWithSignout={true} />
          <ImageUploaded />
        </>
      )}
    </div>
  );
};

export default ReportDataUploaded;
