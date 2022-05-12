import Header from "../components/HeaderConditional";
import Sidebar from "../components/SideBar/SideBar";
import { BrowserRouter as Router } from "react-router-dom";
import EmailVerified from "../components/EmailVerified";
function home() {
  return (
    <>

<link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,600;0,700;1,600;1,700&display=swap" rel="stylesheet"></link>
    <div>
      <EmailVerified />
    </div>
    </>
  );
}
export default home;
