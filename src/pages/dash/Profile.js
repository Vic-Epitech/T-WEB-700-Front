/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import './dash.css';
import { baseUrl, corisXUserDatas, corisXUserToken } from '../../utils/utils';
import { Navigate } from 'react-router-dom';
import axios from "axios";

export default function Profile() {

  const userData = JSON.parse(localStorage.getItem(corisXUserDatas));
  const token = localStorage.getItem(corisXUserToken)

  const [firstName, setFirstName] = useState(userData.firstname);
  const [lastName, setLastName] = useState(userData.lastname);
  const [userName, setUserName] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  
  const [loadingUserDatas, setLoadingUserDatas] = useState(false);
  
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [loadingPasswordDatas, setLoadingPasswordDatas] = useState(false);

  if(!userData) {
    Navigate('/');
  }

  const logout = () => {
    localStorage.removeItem(corisXUserDatas)
    localStorage.removeItem(corisXUserToken)
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  const changeDatas = async () => {
    
    const log = {
      "lastname": lastName,
      "firstname": firstName,
      "username": userName,
      "email": email
   }

     let config = {
       headers: {
         'Authorization': 'Bearer ' + token
       }
     }

     try {

      setLoadingUserDatas(true);

       const response = await axios.put( baseUrl + 'users/updateuserinfos', log, config);
       console.log(response.data); // Handle successful login

       if(response.data.data) {

        localStorage.setItem(corisXUserDatas, JSON.stringify(response.data.data))
        // eslint-disable-next-line no-restricted-globals
        location.reload();

       }
       else {
         //   setError(true);
       }

     } catch (error) {
       console.error('Login failed', error);
     } finally {
      setLoadingUserDatas(false);
     }

  };

  const changePassword = async () => {
    
      const log = {
        "email": email,
        "oldPassword": password,
        "newPassword": confirmpassword
    }

     let config = {
       headers: {
         'Authorization': 'Bearer ' + token
       }
     }

     try {

      setLoadingPasswordDatas(true);

       const response = await axios.put( baseUrl + 'users/password-update', log, config);
       console.log(response.data); // Handle successful login

       if(response.data) {

        logout()

       }
       else {
         //   setError(true);
       }

     } catch (error) {
       console.error('Login failed', error);
     } finally {
      setLoadingPasswordDatas(false);
     }
    
  };


  useEffect(() => {

    // console.log(userData)

     let config = {
       headers: {
         'Authorization': 'Bearer ' + token
       }
     }

     fetch( baseUrl + 'users/user?username=' + userData.username , config)
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
          //  totalPosts = data.data;
          //  setUser(data.data);

          // setLoader(false);
        })
        .catch((err) => {
           console.log(err);
        });
  }, []);

  return (
    
    <>
    
      <div className="d-flex">

  <img className="profile_logo" src={`https://api.dicebear.com/7.x/open-peeps/svg?seed=${userData.firstname}+${userData.lastname}`} alt="Logo" />

  <h2 className="profile_name">{userData.firstname} {userData.lastname}</h2>

      </div>

      <div className="container">

      <div className="row gx-4">

        <form className="col-md-6 form_container">

            <h4>Information de Compte</h4>

            <div className="form_login row gy-4">

                <div className="col-6">
                    <input type="text" className=""  value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom"/>
                </div>

                <div className="col-6">
                    <input type="text" className=""  value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom"/>
                </div>

                <div className="col-12">
                    <input type="text" className="" disabled value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username"/>
                </div>

                <div className="col-12">
                    <input type="email" className="" disabled  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                </div>

            </div>

            <div className="form_login row actions">

                <div className="col-10 action">
                    <input onClick={changeDatas} type="button" value={loadingUserDatas ? 'Changement d\'information...' : 'Valider'}/>
                </div>

            </div>

        </form>

        <form className="col-md-5 form_container ml-2rem">

            <h4>Changement de mot de passe</h4>

            <div className="form_login row gy-4">

                <div className="col-12">
                    <input type="password" className=""  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ancien Mot de passe"/>
                </div>

                <div className="col-12">
                    <input type="password" className=""  value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Nouveau mot de passe"/>
                </div>

            </div>

            <div className="form_login row actions">

                <div className="col-10 action">
                    <input onClick={changePassword} type="button" value={loadingPasswordDatas ? 'Changement de mot de passe...' : 'Changer'}/>
                </div>

            </div>

        </form>

      </div>

      </div>

    </>
    
  );
}