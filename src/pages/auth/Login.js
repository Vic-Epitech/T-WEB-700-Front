/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useState } from "react";
import Header from "../Header";
import './auth.css'
import axios from "axios";
import { baseUrl, corisXUserDatas, corisXUserToken } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

function Login(){

    const [email, setUsername] = useState("JohnDoex@example.com");
    const [password, setPassword] = useState("securepassword");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();
  
    const navigateToDash = () => {
      navigate('/dash');
    };

    const [ user, setUser ] = useState([]);
  
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
  
    const handleLoginWithGoogle = async (data) => {

        const log = {
            "email": data.email,
            "lastname": data.family_name,
            "firstname": data.given_name,
            "username": `${data.given_name}_${data.family_name}`
        }

        console.log(log)
        
        try {
              
            setLoading(true);
            const response = await axios.post( baseUrl + 'api/auth/google/login', log);
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

    const responseMessage = (response) => {
        console.log(response);
        if(response) {
            
            axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.credential}`, {
                headers: {
                    Authorization: `Bearer ${response.credential}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                // setProfile(res.data);
                // console.log(res.data);
            })
            .catch((err) => console.log(err));
        }
    };

    const errorMessage = (error) => {
        console.log(error);
    };


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log(codeResponse);
            setUser(codeResponse)
            
            axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                headers: {
                    Authorization: `Bearer ${codeResponse.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                // setProfile(res.data);
                console.log(res.data);

                handleLoginWithGoogle(res.data);

            })
            .catch((err) => console.log(err));
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    return (
        
        <>
        
            <div className=""
                style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/planes-logs.appspot.com/o/auth_bg_coris_exchange1.png?alt=media&token=b12c3496-a04a-4600-97ee-ba3031b4ae84')", height: "50rem", backgroundRepeat:"no-repeat", backgroundSize: "cover" }}>

                <Header/>

                <div className="main_container" style={{ marginTop: "1rem" }}>

                    <div className="row">

                        <form className="col-12 col-md-6 auth_container">

                            <h4>Connexion</h4>

                            {/* <div className="social_login row gx-5">

                                <div className="col-12 col-md-8 social_auth_align">
                                    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                                </div>


                            </div> */}

                            <div className="social_login row gx-5">

                                <div className="col-12 col-md-6 social_auth_align">
                                    <a href="#" className=""  onClick={() => login()} >
                                        <h6>Se connecter avec Google</h6>
                                        <img src="https://firebasestorage.googleapis.com/v0/b/planes-logs.appspot.com/o/google.png?alt=media&token=9100b195-b0d8-4f5a-a726-e7285c6a50b7" alt="google logo"/>
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