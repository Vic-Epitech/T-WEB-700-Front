/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Header from "../Header";
import './auth.css'
import { useNavigate } from "react-router-dom/dist";
import axios from "axios";
import { baseUrl } from "../../utils/utils";

function Register(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [ setError] = useState('');

    const navigate = useNavigate();
  
    const navigateToLogin = () => {
      navigate('/auth/login');
    };
  
    const checkEqual = (pass, confirmPass) => {
      return pass === confirmPass;
    };
  
    const handleRegister = async () => {

        const log = {
            "lastname": lastName,
            "firstname": firstName,
            "username": userName,
            "email": email,
            "password": password,
            "role": "user",
            "articles": "",
            "cryptos": ""
        }

        console.log(log)

        if (!checkEqual(password, confirmpassword)) {
            setError(true);
        }

        else {

            console.log('2' ,log)

            try {
              setLoading(true);
              const response = await axios.post( baseUrl + 'api/auth/register', log);
              console.log(response.data); // Handle successful login
  
              if(response.data.data) {
  
                // console.log('Success');
                //   localStorage.setItem(corisXUserToken, response.data.data.token);
  
                navigateToLogin();
                //   setTimeout(() => {
                //       navigateToLogin();
                //   }, 200);
  
              }
              else {
                //   setError(true);
              }
  
            } catch (error) {
              console.error('Login failed', error);
            } finally {
              setLoading(false);
            }

        }

    };

    return (
        
        <>
        
            <div className=""
                style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/planes-logs.appspot.com/o/auth_bg_coris_exchange1.png?alt=media&token=b12c3496-a04a-4600-97ee-ba3031b4ae84')", height: "50rem", backgroundRepeat:"no-repeat", backgroundSize: "cover" }}>

                <Header/>

                <div className="main_container" style={{ marginTop: "1rem" }}>

                    <div className="row">

                        <form className="col-12 col-md-6 auth_container">

                            <h4>Création de Compte </h4>

                            <h5>The username or the email already exists</h5>

                            <div className="form_login row gy-4">

                                <div className="col-6">
                                    <input type="text" className=""  value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom"/>
                                </div>

                                <div className="col-6">
                                    <input type="text" className=""  value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom"/>
                                </div>

                                <div className="col-12">
                                    <input type="text" className=""  value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username"/>
                                </div>

                                <div className="col-12">
                                    <input type="email" className=""  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                                </div>

                                <div className="col-6">
                                    <input type="password" className=""  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe"/>
                                </div>

                                <div className="col-6">
                                    <input type="password" className=""  value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmer Mot de passe"/>
                                </div>

                                <div className="col-12 row auth_acts">

                                    {/* <div>
                                    </div> */}
                                        <a className="col-6" href="/auth/login">Vous avez déjà un compte ?</a>
                                    {/* <div>
                                    </h4> */}
                                </div>

                            </div>

                            <div className="form_login row actions">

                                <div className="col-6 action">
                                    <input onClick={handleRegister} type="button" value={loading ? 'Création de compte...' : 'Valider'}/>
                                </div>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        
        </>
    )
}

export default Register;