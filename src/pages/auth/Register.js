/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Header from "../Header";
import './auth.css'

function Register(){

    return (
        
        <>
        
            <div className=""
                style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/planes-logs.appspot.com/o/auth_bg_coris_exchange1.png?alt=media&token=b12c3496-a04a-4600-97ee-ba3031b4ae84')", height: "50rem", backgroundRepeat:"no-repeat", backgroundSize: "cover" }}>

                <Header/>

                <div className="main_container" style={{ marginTop: "1rem" }}>

                    <div className="row">

                        <form className="col-12 col-md-6 auth_container">

                            <h4>Création de Compte </h4>

                            <div className="form_login row gy-4">

                                <div className="col-6">
                                    <input type="text" className="" placeholder="Prénom"/>
                                </div>

                                <div className="col-6">
                                    <input type="text" className="" placeholder="Nom"/>
                                </div>

                                <div className="col-12">
                                    <input type="email" className="" placeholder="Email"/>
                                </div>

                                {/* <div className="col-6">
                                    <input type="text" className="" placeholder="Email"/>
                                </div>

                                <div className="col-6">
                                    <input type="text" className="" placeholder="Email"/>
                                </div>

                                <div className="col-6">
                                    <input type="text" className="" placeholder="Email"/>
                                </div>

                                <div className="col-6">
                                    <input type="text" className="" placeholder="Email"/>
                                </div> */}

                                <div className="col-6">
                                    <input type="password" className="" placeholder="Mot de passe"/>
                                </div>

                                <div className="col-6">
                                    <input type="password" className="" placeholder="Confirmer Mot de passe"/>
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
                                    <input type="button" value="Valider"/>
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