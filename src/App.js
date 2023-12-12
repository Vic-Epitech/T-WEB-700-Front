import { Routes, Route } from "react-router-dom";
import Blog from './pages/Blog';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

import Dashboard from './pages/dash/Dashboard';

import './App.css'
import './index.css'
import Crypto from "./pages/Crypto";

function App() {
  return (
      
    <Routes>
    
      <Route path="/dash" element={<Dashboard/>} />
      <Route path="/dash/cryptos" element={<Dashboard/>} />
      <Route path="/dash/articles" element={<Dashboard/>} />
      <Route path="/dash/users" element={<Dashboard/>} />
      <Route path="/dash/settings" element={<Dashboard/>} />
      <Route path="/dash/profile" element={<Dashboard/>} />
    
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
