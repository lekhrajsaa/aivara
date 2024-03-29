//import useState hook to create menu collapse state
import React, { useState, useEffect } from "react";
//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
//icon for the home page
import { RiHome2Line } from "react-icons/ri";
//icon for the setting page
import { BiCog } from "react-icons/bi";
//icons for opening and closing of the sidebar
import {
  AiOutlineRight,
  AiOutlineLeft,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
//useRouter used to route to different pages
import { useRouter } from "next/router";
//icons used for reports
import { BsFileText } from "react-icons/bs";
//icon used for logout
import { CgLogOff } from "react-icons/cg";
//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import classes from "./SideBar.module.css";
import LogoutPopup from "../util/logoutPopup";

//unused imports might be deleted later
import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { CgChevronRight } from "react-icons/cg";
import { HiOutlineDocumentReport } from "react-icons/hi";

//Slidebar Function
const Sidebar = (props) => {
  const router = useRouter();
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);
  //used to cleare the token and email after logout form localStorage
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  // const removeDetail = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("email");
  //   // window.location.href = "/";
  //   router.push('/')
  // };
//initial state of sidebar on screen load
  useEffect(() => {
    if (window.innerWidth < 1000) {
      setMenuCollapse(true);
    } else {
      setMenuCollapse(false);
    }
    window.onresize = () => {
      if (window.innerWidth < 1000) {
        setMenuCollapse(true);
      } else {
        setMenuCollapse(false);
      }
    };
  }, []);

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader style={{ position: "relative" }}>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              {/* <p>{menuCollapse ? "Logo" : "Big Logo"}</p> */}
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}

              {menuCollapse ? (
                <AiOutlineRight
                  size={18}
                  className={classes.closeIcon}
                  style={{ fontWeight: "800" }}
                />
              ) : (
                // <CgChevronRight />
                <AiOutlineLeft size={18} className={classes.closeIcon} />
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square" className={classes.fitInMiddle}>
              <MenuItem
                active={props.highlitehome}
                icon={<RiHome2Line className={classes.icon} />}
              >
                <a
                  onClick={() => router.push("/home")}
                  style={{ color: "white" }}
                  className={classes.txt}
                >
                  Home
                </a>
              </MenuItem>
              <MenuItem
                active={props.highlite}
                icon={<BsFileText className={classes.icon} />}
              >
                <a
                  onClick={() => router.push("/reports")}
                  style={{ color: "white" }}
                  className={classes.txt}
                >
                  Reports
                </a>
              </MenuItem>
              <MenuItem icon={<BiCog className={classes.icon} />}>
                <a
                  // onClick={() => router.push("/newHome")}
                  style={{ color: "white" }}
                  className={classes.txt}
                >
                  Settings
                </a>
              </MenuItem>
              <MenuItem icon={<CgLogOff className={classes.icon} />}>
                <a
                  onClick={() => setOpenLogoutPopup(true)}
                  style={{ color: "white" }}
                  className={classes.txt}
                >
                  Log out
                </a>
              </MenuItem>
              <MenuItem
                icon={<AiOutlineExclamationCircle className={classes.icon} />}
              >
                <a
                  // onClick={() => router.push("/editProfile")}
                  style={{ color: "white" }}
                  className={classes.txt}
                >
                  Help
                </a>
              </MenuItem>
            </Menu>
          </SidebarContent>
          {/* <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter> */}
        </ProSidebar>
      </div>

      {/* Logout Dilog Box */}
      <LogoutPopup
        setOpenLogoutPopup={setOpenLogoutPopup}
        open={openLogoutPopup}
      />
    </>
  );
};

export default Sidebar;
