import React, { useEffect, useState } from "react";

// import HeaderApp from "../components/HeaderApp";
import ReportSubmit from "../components/generate_report/ReportSubmit";
import Header from "../components/Header/HeaderConditional";
import { useRouter } from "next/router";

export default function home() {
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
          <Header headerWithSignout={false} />
          <main>
            <ReportSubmit />
          </main>
        </>
      )}
    </>
  );
}
