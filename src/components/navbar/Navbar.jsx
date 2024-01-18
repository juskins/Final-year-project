import "./navbar.scss";
import NotificationList from "../alerts/Alerts";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { baseUrl } from "../../context/constants";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useState, useContext } from "react";
import {NavLink} from "react-router-dom";


const Navbar = ({setOpenMenu}) => {
  const { dispatch } = useContext(DarkModeContext);
  const [showNotifications, setShowNotifications] = useState(true);
  const [loading , setLoading] = useState(false)

  const toggleNotifications = () => {
    setOpenMenu((prv) => !prv)
  };

  const sendExp = async () => {
  setLoading(true)
  try{

    const res = await fetch(`${baseUrl}/send_exp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    console.log(data)
    setLoading(false)
    
  }catch(err){
    setLoading(false)
console.log(err)
  }
  }
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
          
          <div className="item flex items-center">
          <button  onClick={sendExp}
                  disabled={loading}   className={`text-white py-2 px-3 bg-[#131a4e] hover:bg-[#131a4ecc] text-[12px] ${loading ? "bg-gray-200" : ""}`}>
                  {loading ? <><CircularProgress size={10} sx={{ color:"#fffff"}} /> <small> sending...</small></> : "Send Expired Products"}
                </button>
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
