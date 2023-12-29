import React from 'react';
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

function App() {

  return (
      
    <Routes>
    
      <Route path="/dash" element={<Dashboard/>} />
      <Route path="/dash/cryptos" element={<Cryptos/>} />
      <Route path="/dash/articles" element={<Articles/>} />
      <Route path="/dash/users" element={<Users/>} />
      <Route path="/dash/settings" element={<Setting/>} />
      <Route path="/dash/profile" element={<Profile/>} />
    
      <Route path="/auth/login" element={<Login/>} />
      <Route path="/auth/register" element={<Register/>} />
      <Route path="/auth/forgot-password" element={<ForgotPassword/>} />

      <Route path="/blog" element={<Blog/>} />
      <Route path="/cryptos" element={<Crypto/>} />
      <Route path="/" element={<Home/>} />

    </Routes>

  );
}

export default App;
