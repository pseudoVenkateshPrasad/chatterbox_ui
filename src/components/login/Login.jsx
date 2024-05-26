import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import CustomAxios from "../../utility/axios";
import { loginApi, } from "../../store/slices/loginSlice";
import { GetAllApi } from '../../store/slices/getAllSlice';
import loginCss from "./login.module.css";
import Button from "../../custom/button/Button";
import TextField from "@mui/material/TextField";
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from "react-router-dom";



const Login = () => {

  const [email, setEmail] = useState(false)
  const [password, setPassword] = useState(false)

  let userLoggedIn = sessionStorage.getItem("id");


  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn !== undefined && userLoggedIn?.length > 0) {
      let returnToPath = sessionStorage.getItem("currentPath");
      console.log("returnToPath", returnToPath);
      return navigate(returnToPath);
    }
  }, [])




  let dispatchAction = useDispatch();

  const loginHandler = async () => {
    if (email && password) {
      let payload = { email: email, password: password };
      try {
        let response = await dispatchAction(loginApi(payload));

        console.log(response);
        if (response.payload.isSuccess) {
          toast.success("Logged In Successfully !")
          navigate("/");
          return;
        } else {
          toast.error("Error Logging In !");
          return;
        }
      }
      catch (err) {
        toast.error("Error Logging In !")
        console.log(err);
      }
    }
  }

  // const getUsers = async () => {
  //   try{
  //     let response = await dispatchAction(GetAllApi());
  //     setUsers(response.payload.data.data);
  //     return response;
  //   }catch(err){
  //     setUsers([]);
  //   }

  // }

  return (
    <>
      <section className={loginCss.container}>
        <section className={loginCss.leftScreen}>
          <div className={loginCss.loginWrapper}>
            <div className={loginCss.imgWrapper}>
              <img src="./user.png" />
            </div>
            <div className={loginCss.signupfieldsBox}>
              <TextField required id="outlined-required" label="Email id" onChange={e => setEmail(e.target.value)} />
              <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className={loginCss.buttonWrapper}>
              <Button onClick={loginHandler}
                color="#fff"
                bgColor="#588157"
                hoverColor="#344e41"
                title="Register Here">Log In </Button>
            </div>
            <div>
              <h4>Forgot Password ?</h4>
            </div>
          </div>

        </section>
        {/* <section className={loginCss.rightScreen}></section> */}
      </section>
    </>
  )
}

export default Login


{/* <input type="email" autocomplete="off" onChange={e => setEmail(e.target.value)} placeholder="enter email" />
      <input type="password" autocomplete="off" onChange={e => setPassword(e.target.value)} placeholder="enter password" />
      <button onClick={loginHandler}>
        Login
      </button> */}