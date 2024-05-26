import React, { useState } from 'react'
import Cookies from "js-cookie";
import { GetAllApi } from '../../store/slices/getAllSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomAxios from '../../utility/axios';

import toast from 'react-hot-toast';
const Home = () => {

  const [data, setData] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const logoutHandler = async () => {
    const cookies = document.cookie;

    console.log("Cookies", cookies);
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("id");

    try {
      let resp = await CustomAxios.get("/logoutUser");
      if (resp && resp.status === 200 && resp.data.isSuccess) {
        toast.success("Logged Out Successfully");
        navigate("/login");
      } else {
        toast.error("Error Logging Out User");
        return;
      }
    } catch (err) {
      return;
    }
  }

  const getUsers = async () => {
    try {
      let response = await dispatch(GetAllApi());
      setData(response.payload.data.data);
    } catch (e) {
      toast.error("Error Fetching users")
    }
  }

  return (
    <>
      <div>Home</div>
      <button onClick={getUsers}>Get All Users</button>
      <button onClick={logoutHandler}>Logout</button>

      {
        data && data?.map((item) => {
          return <li>{item.name}</li>
        })
      }
    </>

  )
}

export default Home