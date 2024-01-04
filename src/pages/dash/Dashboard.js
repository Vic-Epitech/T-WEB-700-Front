/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */

import React, { useEffect, useState } from "react";

import './dash.css';
import reduceText, { baseUrl, corisXUserDatas, corisXUserToken } from '../../utils/utils';
import { Navigate } from "react-router-dom";

const drawerWidth = 240;


export default function Dashboard() {


  const userData = JSON.parse(localStorage.getItem(corisXUserDatas));
  const [posts, setPosts] = useState([]);
  let totalPosts = undefined;
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);

  const logout = () => {
    localStorage.removeItem(corisXUserDatas)
    localStorage.removeItem(corisXUserToken)
    // eslint-disable-next-line no-restricted-globals
    // location.reload();
    Navigate('');
  };

  useEffect(() => {
  
    if(!userData) {
      console.log(userData)
      Navigate('');
    }


     setLoader(true);

     fetch( baseUrl + 'articles/articlesbypage?q=bitcoin&Numb=6&page=' + page)
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
           totalPosts = data.data;
           setPosts(totalPosts);
          //  setPosts(totalPosts['page' + actualPage]);
          //  console.log(posts);

          setLoader(false);
          //  console.log(loader);
        })
        .catch((err) => {
           console.log(err.message);
        });
  }, []);

  return (
        
    <>
        
        <div className="main_container dashContainer" style={{ marginTop: "1rem" }}>
                
                  <h3>Le cours de vos cryptos préférés</h3>

                  <coingecko-coin-price-marquee-widget coin-ids="bitcoin,ethereum,eos,ripple,litecoin"
                    currency="usd" background-color="#ffffff" locale="fr">
                  </coingecko-coin-price-marquee-widget>
                
                  <h3>Presse Review</h3>

                  <div className="latest_articles">

                      <div className="row  gx-5">

                          {posts.map((post) => {
                              return (
                                  <a className="col-12 col-md-4" key={ post.title } href={ post.url } target="_blank">

                                      <div className="article">

                                          <img className="article_cover" src={ post.urlToImage } alt="cover" />

                                          <div className="article_details">

                                              <h2>{ post.title }</h2>

                                              <h3>{ reduceText(post.description) }</h3>

                                              <h4>Publié le : <span>{ post.publishedAt }</span> </h4>

                                          </div>

                                      </div>

                                  </a>
                              );
                          })}

                          { loader
                            ? <h2 className="text-center" >Chargement....</h2>
                            : ''
                          }

                      </div>

                  </div>



                </div>

    </>

  );
}