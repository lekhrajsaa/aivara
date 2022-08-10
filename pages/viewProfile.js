import React, { useEffect, useState } from "react";

import Header from "../components/Header/HeaderConditional";
import ViewProfile from "../components/user_profile/ViewProfile";
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
