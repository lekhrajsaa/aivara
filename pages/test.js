import Header from "../components/HeaderConditional";
import Sidebar from "../components/SideBar/SideBar";
import { BrowserRouter as Router } from "react-router-dom";
function home() {
  return (
    <div>
      <Sidebar />
    </div>
  );
}
export default home;
