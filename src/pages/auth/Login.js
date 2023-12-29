/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useState } from "react";
import Header from "../Header";
import './auth.css'
import axios from "axios";
import { baseUrl, corisXUserDatas, corisXUserToken } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

function Login(){

    const [email, setUsername] = useState("JohnDoex@example.com");
    const [password, setPassword] = useState("securepassword");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();
  
    const navigateToDash = () => {
      navigate('/dash');
    };
  
    const handleLogin = async () => {

        const log = {
            "email": email,
            "password": password
        }

          console.log(log)
          try {
            setLoading(true);
            const response = await axios.post( baseUrl + 'api/auth/login', log);
            console.log(response.data); // Handle successful login

            if(response.data.data) {

                // console.log('Success');
                localStorage.setItem(corisXUserToken, response.data.data.token);
                localStorage.setItem(corisXUserDatas, JSON.stringify(response.data.data.userData));

                setTimeout(() => {
                    navigateToDash();
                }, 200);

            }
            else {
                setError(true);
            }

          } catch (error) {
            console.error('Login failed', error);
          } finally {
            setLoading(false);
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

                            <h4>Connexion</h4>

                            <div className="social_login row gx-5">

                                <div className="col-12 col-md-6">
                                    <a href="#" className="">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/planes-logs.appspot.com/o/google.png?alt=media&token=9100b195-b0d8-4f5a-a726-e7285c6a50b7" alt="google logo"/>
                                        <h3>Google</h3>
                                    </a>
                                </div>

                                <div className="col-12 col-md-6">
                                    <a href="#" className="">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/planes-logs.appspot.com/o/facebook.png?alt=media&token=8c734175-2800-474f-a94f-1a9d3606d571" alt="Facebook logo"/>
                                        <h3>Facebook</h3>
                                    </a>
                                </div>

                            </div>

                            <h2>Ou</h2>

                            <div className="form_login row gy-4">

                                <div className="col-12">
                                    <input type="email" className="" value={email} onChange={(e) => setUsername(e.target.value)} placeholder="Email"/>
                                </div>

                                <div className="col-12">
                                    <input type="password" className="" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe"/>
                                </div>

                                <div className="col-12 row auth_acts">

                                    { error
                                    ? <h5 className="col-12 error" >Identifiants Invalid</h5>
                                    : ''
                                    }

                                    {/* <div>
                                    </div> */}
                                        <a className="col-6" href="/auth/forgot-password">Mot de passe oublié ? 😑</a>

                                    {/* <div>
                                    </div> */}
                                        <a className="col-6" href="/auth/register">Je suis nouveau 😊</a>
                                    {/* <h4>
                                    </h4> */}
                                </div>

                            </div>

                            <div className="form_login row actions">

                                <div className="col-6 action">
                                    <input onClick={handleLogin} type="button" value={loading ? 'Connexion...' : 'Se connecter'}/>
                                </div>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        
        </>
    )
}

export default Login;