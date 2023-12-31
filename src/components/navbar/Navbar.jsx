import "./navbar.scss";
import NotificationList from "../alerts/Alerts";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useState, useContext } from "react";
import {NavLink} from "react-router-dom";

const Navbar = ({setOpenMenu}) => {
  const { dispatch } = useContext(DarkModeContext);
  const [showNotifications, setShowNotifications] = useState(true);

  const toggleNotifications = () => {
    setOpenMenu((prv) => !prv)
  };
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(user)
  return (
    <div className="navbar">
      <div className="wrapper">
        {/* <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div> */}
         <div className="item" onClick={toggleNotifications}>
            <ListOutlinedIcon className="icon" />
          </div>
          {user?.email ? 
          <div className="mx-3"> {"Welcome, "+user?.firstname}</div> :
          <div className="w-full flex items-center justify-center">
          
            <NavLink to="/login">
               Please Login
            </NavLink> 
        </div>
         }
          {/* <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div> */}
          {/* <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div> */}
          
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item icon" >
            {/* <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div> */}
             <NotificationList
      
      isVisible={showNotifications}
      toggleVisibility={toggleNotifications}
    />
          </div>

         
          {/* <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div> */}
        </div>
      </div>

    
  );
};

export default Navbar;
