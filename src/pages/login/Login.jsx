import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import "./login.scss";
import loginImage from "../../assets/supermarket.jpg";
import { useDarkModeContext } from "../../context/darkModeContext";
import CircularProgress from "@mui/material/CircularProgress";
import { baseUrl } from "../../context/constants";

import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import React from "react";
import Notify from "../../components/notify"
import axios from "axios";
import { WidthNormal } from "@mui/icons-material";
const LOGIN_URL = `${baseUrl}/auth/login`;

const Login = () => {
  const { setAuth } = useAuth();

  const {getAllProducts} = useDarkModeContext()

  const navigate = useNavigate();
  const location = useLocation();
  const from = window.location.state?.from?.pathname || "/";

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading , setLoading] = useState(false)
  const [open , setOpen] = useState(false)
  const [successMsg , setSuccessMsg] = useState("")
  const [notify, setNotify] = useState({ open: false, varient:"filled" ,severity: "", message: "" });

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  
  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
 setLoading(true)
    try {
      
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200){
      const { data } = response;
    const { token } = data;
    const { data:user } = data;
    setNotify((notify) => ({
      ...notify,
      open:true,
      severity: "success",
      message:"Logined In Successfully"
    }))
    

    localStorage.setItem('token', token);
     localStorage.setItem('user', JSON.stringify(user));
    getAllProducts()
  
    navigate('/');
      setAuth({ email, pwd, accessToken });
      setEmail("");
      setPwd("");
 setLoading(false)
      }
      
    }catch (err) {
        setNotify((notify) => ({
          ...notify,
        open:true,
        severity: "error",
          message:err?.response?.data.error ||err?.response?.data.message
        }))
        
      
      
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="w-full h-screen flex item-start">
      <div className="relative hidden w-1/2 h-full md:flex flex-col">
        <div className="absolute   top-[25%] lg:left-[10%] px-5 flex flex-col">
          <h1 className="lg:text-6xl md:text-4xl text-white font-bold mb-8">
            Welcome to expiReminder
          </h1>
          <p className="text-xl text-[#f5f5f5] font-normal">
            Your trusted partner in managing product expirations effortlessly
          </p>
          <p className="text-xl text-[#f5f5f5]  font-normal">
            We understand that keeping track of product lifespans can be
            challenging, but with expiReminder, you're in control. Say goodbye
            to wasted groceries and expired goods. It's time to start your
            journey towards a smarter, more organized life.{" "}
          </p>
        </div>
        <img
          src={loginImage}
          alt="Login"
          className="w-full  h-full object-cover"
        />
      </div>

      {/* Login Form */}
      <form
        className="md:w-1/2 w-full h-full bg-[#f5f5f5] flex flex-col p-10 justify-between items-center"
        onSubmit={handleSubmit}

      >

  <Notify 
    open={notify.open}
    severity={notify?.severity}
    autoHideDuration={1000000}
    onClose={() => setNotify({ ...notify, open: false })}
  >
    {notify.message}
  </Notify>
     <div className="flex mb-4 items-center justify-center">
          <img src={logo} alt="logo" className="h-20 w-20" />
          <h1 className="text-3xl text-[#131a4e] font-bold">expiReminder</h1>
        </div>

        <div className="w-full flex flex-col max-w-[500px]">
          <div className="flex flex-col w-full mb-2">
            <h3 className="text-4xl font-semibold mb-2">Login</h3>
            <p className="text-sm mb-2">
              Welcome back! Please enter your details
            </p>
          </div>

          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />

          <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center">
              <input type="checkbox" name="" className="w-4 h-4 mr-2" />
              <p className="text-sm">Remember me</p>
            </div>

            <Link to={'/reset_password'} className="text-sm font-bold whitespace-nowrap cursor-pointer underline hover:text-[#FF7F00] underline-offset-2">
              Forgot Password
            </Link>
          </div>

          <div className="w-full flex flex-col my-4">
            <button disabled={loading} className={`w-full my-2
             bg-[#131a4e] rounded-md p-4 flex justify-center gap-6 text-center font-semibold
              hover:bg-[#FF7F00] text-white ${loading ? 'bg-gray-200  hover:bg-gray-200':""}`}>
              {loading?<><CircularProgress size={20} sx={{ color:"#FF7F00"}} /> Loggin in...</> :"Log in"}
            </button>
          </div>

          {/* <div className="w-full flex justify-center items-center relative py-2">
            <div className="w-full h-[1px] bg-black"></div>
            <p className="text-xl absolute text-black/80 bg-[#f5f5f5]">or</p>
          </div> */}

          {/* <div className="w-full my-2 bg-[white] flex items-center justify-center rounded-md p-4 hover:text-[#FF7F00] text-center font-semibold border border-[darkBlue]/10 text-[darkBlue] cursor-pointer">
            <img src={googleImg} alt="google-icon" className="mr-2 h-6"/>
            Sign In with google
          </div> */}
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[darkBlue]">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="underline font-semibold hover:text-[#FF7F00] cursor-pointer underline-offset-2">
                Sign up for free
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
