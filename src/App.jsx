
import react from 'react'
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import "./index.css"
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Profile from "./pages/profile/Profile";
import { Notifications } from "./components/notifications/Notifications";
import Layout from "./layout/Layout";
import RequireAuth from "./components/RequiredAuth";
import ResetPwd from "./pages/forgetPassword/forgetPassword"

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`${darkMode ? "app dark" : "app"} relative max-w-[1440px] mx-auto`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset_password" element={<ResetPwd />} />
           


           <Route path="/"  element={<RequireAuth />} > 
      <Route path="/" element={<Home />} />
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              {/* <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              /> */}
            </Route>
          
           
          <Route path="profile" element={<Profile />} />

          <Route path="/notification" element={<Notifications />} />
             </Route>  
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
