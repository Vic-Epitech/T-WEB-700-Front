/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Header from "../Header";
import './auth.css'

function Login(){

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
                                    <input type="email" className="" placeholder="Email"/>
                                </div>

                                <div className="col-12">
                                    <input type="password" className="" placeholder="Mot de passe"/>
                                </div>

                                <div className="col-12 row auth_acts">

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
                                    <input type="button" value="Se connecter"/>
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