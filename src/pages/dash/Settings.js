/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import './dash.css';
import { baseUrl, corisXUserDatas, corisXUserToken } from '../../utils/utils';
import { Navigate } from 'react-router-dom';
import axios from "axios";

export default function Setting() {

  const userData = JSON.parse(localStorage.getItem(corisXUserDatas));
  const token = localStorage.getItem(corisXUserToken)
  
  const [maxCrypto, setmaxCrypto] = useState("");
  const [maxArticle, setmaxArticle] = useState("");

  const [loadingSettings, setloadingSettings] = useState(false);


  if(!userData) {
    Navigate('/');
  }

  useEffect(() => {

     fetch( baseUrl + 'anonym?identifier=Value1')
        .then((response) => response.json())
        .then((data) => {

           console.log(data);
           setmaxCrypto(data.data.maxCryptView);
           setmaxArticle(data.data.maxArticleView);
           
        })
        .catch((err) => {
           console.log(err);
          //  setUserLoader(false);
        });

  }, []);

  const changeSettingsDatas = async () => {
    
    const log = {
      "identifier": "Value1",
      "newmaxCryptView": maxCrypto,
      "newmaxArticleView": maxArticle
   }

     let config = {
       headers: {
         'Authorization': 'Bearer ' + token
       }
     }

     try {

      setloadingSettings(true);

       const response = await axios.put( baseUrl + 'anonym/updatevalues', log, config);
       console.log(response.data); // Handle successful login

       if(response.data) {

          // eslint-disable-next-line no-restricted-globals
          location.reload();

       }
       else {
         //   setError(true);
       }

     } catch (error) {
       console.error('Login failed', error);
     } finally {
      setloadingSettings(false);
     }

  };

  return (
    
    <>
    
    <div className="container">
            
            <div className="row gx-4">

              <form className="col-md-5 form_container ml-2rem">

                  <h4>Changement de Paramèttres de Config</h4>

                  <div className="form_login row gy-4">

                      <div className="col-12">
                          <input type="text" className=""  value={maxCrypto} onChange={(e) => setmaxCrypto(e.target.value)} placeholder="Max crypto"/>
                      </div>

                      <div className="col-12">
                          <input type="text" className=""  value={maxArticle} onChange={(e) => setmaxArticle(e.target.value)} placeholder="Max d\'article"/>
                      </div>

                  </div>

                  <div className="form_login row actions">

                      <div className="col-10 action">
                          <input onClick={changeSettingsDatas} type="button" value={loadingSettings ? 'Changement de paramettre...' : 'Changer'}/>
                      </div>

                  </div>

              </form>

            </div>

    </div>
    
    </>

  );
}