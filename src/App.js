import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Blog from './pages/Blog';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

import Dashboard from './pages/dash/Dashboard';
import Crypto from "./pages/Crypto";
import Cryptos from "./pages/dash/DashCrypto";
import Articles from "./pages/dash/Articles";
import Users from "./pages/dash/Users";
import Setting from "./pages/dash/Settings";
import Profile from "./pages/dash/Profile";

import './App.css'
import './index.css'
import { baseUrl, corisXUserDatas, corisXUserToken } from './utils/utils';
import DashLayout from './pages/dash/dashLayout';

function App() {

  const token = localStorage.getItem(corisXUserToken);
  const userD = localStorage.getItem(corisXUserDatas)

  // useEffect(() => {

  //    let config = {
  //      headers: {
  //        'Authorization': 'Bearer ' + token
  //      }
  //    }

  //   if (userD) {
    
  //    fetch( baseUrl + 'users/user?username=' + userD.username , config)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         localStorage.setItem(corisXUserDatas, JSON.stringify(data.data));
  //       })
  //       .catch((err) => {
  //          console.log(err);
  //       });
       
  //    } 
    
    
  // }, []);

  return (
      
    <Routes>

    { token && userD ? (
      <>
        
        <Route element={<DashLayout />}>
          
          <Route path='/dash/*' element={<Dashboard />} />
          <Route path="/dash" element={<Dashboard/>} />
          <Route path="/dash/cryptos" element={<Cryptos/>} />
          <Route path="/dash/articles" element={<Articles/>} />
          <Route path="/dash/users" element={<Users/>} />
          <Route path="/dash/settings" element={<Setting/>} />
          <Route path="/dash/profile" element={<Profile/>} />
          
        </Route>

      </>
    ) : (
      <>
        <Route path='/auth' element={<Login/>} />
        <Route path="/auth/login" element={<Login/>} />
        <Route path="/auth/register" element={<Register/>} />
        <Route path="/auth/forgot-password" element={<ForgotPassword/>} />
        <Route path='*' element={<Home/>} />
      </>
    )}
    
      <Route path="/blog" element={<Blog/>} />
      <Route path="/cryptos" element={<Crypto/>} />
      <Route path="/" element={<Home/>} />

    </Routes>

  );
}

export default App;
