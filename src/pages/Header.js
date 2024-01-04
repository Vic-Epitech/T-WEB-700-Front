/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import { corisXUserDatas } from "../utils/utils";

function Header(){

    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem(corisXUserDatas));
  
    const navigateToHome = () => {
      navigate('/');
    };
  
    const navigateToBlog = () => {
      navigate('/blog');
    // location.assign('blog')
    };
  
    const navigateToCrytpos = () => {
      navigate('/cryptos');
    // location.assign('blog')
    };
  
    const navigateToLogin = () => {
      navigate('/auth/login');
    };

    useEffect(() => {

      console.log(userData)

    }, []);

    return (
        
        <>
        
          <div className="main_container header">

              <img onClick={navigateToHome} style={{cursor: "pointer"}} className="logo" src={"https://firebasestorage.googleapis.com/v0/b/planes-logs.appspot.com/o/long_logo2.png?alt=media&token=53846e2f-22bd-4645-a9f0-340d4454ab38"} alt="Logo" />

              <div style={{ display: "flex" }}>

                  <a onClick={navigateToBlog} style={{ marginRight: "10px", paddingTop: "5px", cursor: "pointer"}}> Blog</a>

                  <a onClick={navigateToCrytpos} style={{ marginRight: "10px", paddingTop: "5px", cursor: "pointer"}}> Market</a>

                  {/* <a href="/dash" style={{ marginRight: "10px", paddingTop: "5px" }}> dash</a> */}

                  <select className="step__8">
                      <option value="someOption">XOF</option>
                      <option value="otherOption">EURO</option>
                      <option value="otherOption">DOLLAR</option>
                  </select>

                  { userData
                    ? <a href="/dash">
                      <img className="avatar" src={`https://api.dicebear.com/7.x/open-peeps/svg?seed=${userData.firstname}+${userData.lastname}`} alt="Logo"/>
                    </a>
                    
                    : <a onClick={navigateToLogin} style={{cursor: "pointer"}} className="login step__9">Se Connecter</a>
                  }

                  {/* <a href="/auth/login" className="login">Se Connecter</a> */}
                  {/* <a onClick={navigateToLogin} style={{cursor: "pointer"}} className="login">Se Connecter</a> */}

                  {/* <img className="avatar" src={"https://ui-avatars.com/api/?name=John+Doe"} alt="Logo" /> */}

              </div>

          </div>
        
        </>
    )
}

export default Header;