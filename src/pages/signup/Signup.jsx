import "./signup.scss";
import logo from "../../assets/logo.svg";
import React, { useState, useRef, useEffect } from "react";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import CirecularProgress from "@mui/material/CircularProgress";
import axios from "axios"
import {Link ,useNavigate} from "react-router-dom"
import { baseUrl } from "../../context/constants";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const REGISTER_URL = `${baseUrl}/auth/signup`;


const Signup = () => {
  const navigate = useNavigate();
  const userFirstNameRef = useRef();
  const userLastNameRef = useRef();
  const errRef = useRef();

  const [userFirstName, setUserFirstName] = useState("");

  const [validFirstName, setValidFirstName] = useState(false);
  const [userFocusFirstName, setUserFocusFirstName] = useState(false);

  const [userLastName, setUserLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [userFocusLastName, setUserFocusLastName] = useState(false);

  const [shopName, setShopName] = useState("");
  const [validShopName, setValidShopName] = useState(false);
  const [shopNameFocus, setShopNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [phone_number, setPhone_number] = useState("");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const[loading , setLoading] = useState(false)
  const code = "+234"

  useEffect(() => {
    userFirstNameRef.current.focus();
  }, []);

  useEffect(() => {
console.log('phone' , phone_number)
  }, [phone_number]);

  useEffect(() => {
    const result = USER_REGEX.test(userFirstName);
    console.log(result);
    console.log(userFirstName);
    setValidFirstName(result);
  }, [userFirstName]);

  useEffect(() => {
    const result = USER_REGEX.test(userLastName);
    console.log(result);
    console.log(userLastName);
    setValidLastName(result);
  }, [userLastName]);

  useEffect(() => {
    const result = USER_REGEX.test(shopName);
    console.log(result);
    console.log(shopName);
    setValidShopName(result);
  }, [shopName]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
  }, [pwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [userFirstName, pwd, userLastName, shopName, email]);

  const phoneNoWithZero = phone_number[0] =="0" ? phone_number.slice(1, 11):(phone_number.slice(0, 10))

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(userFirstName);
    const v2 = USER_REGEX.test(userLastName);
    const v3 = PWD_REGEX.test(pwd);
    const v4 = USER_REGEX.test(shopName);
    const v5 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      setErrMsg("Invalid Entry");
      return;
    }
    setLoading(true)
   try {
    const response = await axios.post(
REGISTER_URL,JSON.stringify({
  firstname: userFirstName,
  lastname: userLastName,
  password: pwd,
  email: email,
  shop_name:shopName,
  phone_number:code+phoneNoWithZero

}),
{
  headers: { 'Content-Type': 'application/json' },

}
    )
    console.log(response?.data);
    console.log(response?.accessToken);
    console.log(JSON.stringify(response))
    setSuccess(true);
    const { data } = response;
    const { token } = data;
    setLoading(false)
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(data.data));
  navigate('/')
   } catch (err) {
    setErrMsg(err?.response?.data.error)
  errRef.current.focus();
   }finally{
    setLoading(false)
   }
  };

  console.log("uty" , code+phoneNoWithZero)

  return (
    <div className="body">
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to={'/'}>Sign In</Link>
          </p>
        </section>
      ) : (
        <div className="card">
          <div className="left">
            <div className="flex mb-8 items-center justify-center">
              <img src={logo} alt="logo" className="h-20 w-20" />
              <h2 className="text-3xl text-[#131a4e] font-bold">
                expiReminder
              </h2>
            </div>
            <h1>Welcome to ExpiReminder: Your Expiration Date Guardian</h1>
            <p>
              Unlock a world of proactive product safety and expiration tracking
              with ExpiReminder. At ExpiReminder, we understand the importance
              of keeping your products safe, your family healthy, and your
              business efficient.
            </p>
            <h1>Why Register with ExpiReminder?</h1>
            <p>
              ExpiReminder is more than just a tool; it's your guardian against
              waste and safety risks. By registering with us, you gain exclusive
              access to a range of features designed to make your life easier
              and safer:
            </p>
          </div>

          <form action="" onSubmit={handleSubmit}>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Get started</h1>
            <p>
              Signing up takes only a few seconds. It's the first step towards a
              safer, more organized life.
            </p>

            <div>
              <label htmlFor="firstname">
                First Name:
                <FaCheck className={validFirstName ? "valid" : "hide"} />
                <FaTimes
                  className={
                    validFirstName || !userFirstName ? "hide" : "invalid"
                  }
                />
              </label>
              <input
                type="text"
                id="firstname"
                ref={userFirstNameRef}
                autoComplete="off"
                onChange={(e) => setUserFirstName(e.target.value)}
                value={userFirstName}
                required
                aria-invalid={validFirstName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocusFirstName(true)}
                onBlur={() => setUserFocusFirstName(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocusFirstName && userFirstName && !validFirstName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FaInfoCircle />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            <div>
              <label htmlFor="lastname">
                LastName:
                <FaCheck className={validLastName ? "valid" : "hide"} />
                <FaTimes
                  className={
                    validLastName || !userLastName ? "hide" : "invalid"
                  }
                />
              </label>
              <input
                type="text"
                id="username"
                ref={userLastNameRef}
                autoComplete="off"
                onChange={(e) => setUserLastName(e.target.value)}
                value={userLastName}
                required
                aria-invalid={validLastName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocusLastName(true)}
                onBlur={() => setUserFocusLastName(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocusLastName && userLastName && !validLastName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FaInfoCircle />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>
            <div>
              <label htmlFor="email">
                Email:
                <FaCheck className={validEmail ? "valid" : "hide"} />
                <FaTimes
                  className={validEmail || !email ? "hide" : "invalid"}
                />
              </label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FaInfoCircle />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>
            <div>
              <label htmlFor="number">
                Number:
                {/* <FaCheck className={validEmail ? "valid" : "hide"} />
                <FaTimes
                  className={validEmail || !email ? "hide" : "invalid"}
                /> */}
              </label>
            <span>{code}</span>
<input
  //type="tel"
  id="Phone_number"
  autoComplete="off"
  onChange={(e) => setPhone_number(e.target.value)}
  value={phone_number[0] !== '0' ? phone_number.slice(0, 10):phone_number.slice(0, 11)}
  required
  aria-describedby="uidnote"
/>
            </div>
            <div>
              <label htmlFor="shopname">
                Shop Name:
                <FaCheck className={validShopName ? "valid" : "hide"} />
                <FaTimes
                  className={validShopName || !shopName ? "hide" : "invalid"}
                />
              </label>
              <input
                type="text"
                id="shopname"
                autoComplete="off"
                onChange={(e) => setShopName(e.target.value)}
                value={shopName}
                required
                aria-invalid={validShopName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setShopNameFocus(true)}
                onBlur={() => setShopNameFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  shopNameFocus && shopName && !validShopName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FaInfoCircle />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>
            <div>
              <label htmlFor="password">
                Password:
                <FaCheck className={validPwd ? "valid" : "hide"} />
                <FaTimes className={validPwd || !pwd ? "hide" : "invalid"} />
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                <FaInfoCircle />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
            </div>

            <button className={`w-full my-2
             bg-[#131a4e] rounded-md p-4 flex justify-center gap-6 text-center font-semibold
              hover:bg-[#FF7F00] text-white ${loading ? 'bg-gray-200  hover:bg-gray-200':""}`}
                disabled={
                !validFirstName ||
                !validLastName ||
                !validPwd ||
                !validEmail ||
                !validShopName ||
                loading
                  ? true
                  : false
              }
            >
            {loading?<><CirecularProgress size={20} sx={{ color:"#FF7F00"}} /> Loggin in...</> :"Log in"}
            </button>

            {/* <h3>Join the ExpiReminder Community Today!</h3> */}
            <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[darkBlue]">
            Already have an account?{" "}
            <Link to="/login">
              <span className="underline font-semibold hover:text-[#FF7F00] cursor-pointer underline-offset-2">
                Login
              </span>
            </Link>
          </p>
        </div>
         </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
