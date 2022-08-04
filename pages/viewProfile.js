import React, { useEffect, useState } from "react";

import Header from "../components/HeaderConditional";
import ViewProfile from "../components/ViewProfile";
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
          <Header headerWithSignout={true} />

          <main>
            <ViewProfile />
          </main>
        </>
      )}
    </>
  );
}
