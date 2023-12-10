import { Routes, Route } from "react-router-dom";
import Blog from './pages/Blog';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import './App.css'
import './index.css'

function App() {
  return (
      
    <Routes>
    
      {/* <Route path="/auth/login" element={<Login/>} /> */}
    
      <Route path="/auth/login" element={<Login/>} />
      <Route path="/auth/register" element={<Register/>} />
      <Route path="/auth/forgot-password" element={<ForgotPassword/>} />

      <Route path="/blog" element={<Blog/>} />
      <Route path="/" element={<Home/>} />

    </Routes>

  );
}

export default App;
