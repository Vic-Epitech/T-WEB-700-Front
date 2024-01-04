/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import './dash.css';
import reduceText, { baseUrl, corisXUserDatas, corisXUserToken } from '../../utils/utils';
import { Navigate } from "react-router-dom";

export default function Articles() {

  const userData = JSON.parse(localStorage.getItem(corisXUserDatas));
  const [posts, setPosts] = useState([]);
  let totalPosts = undefined;
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {

    if(!userData) {
      Navigate('/');
    }

     setLoader(true);

     fetch( baseUrl + 'articles/articlesbypage?q=bitcoin&Numb=9&page=' + page)
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

  const loadMoreArticles = () => {
      
      setPage(page + 1);
      
      setLoader(true);

      fetch( baseUrl + 'articles/articlesbypage?q=bitcoin&Numb=9&page=' + page)
        .then((response) => response.json())
        .then((data) => {
          console.log(posts);
          console.log(data.data);
          console.log(posts.contat(data.data));
           setPosts(posts.contat(data.data));
           setLoader(false);
        })
        .catch((err) => {
           console.log(err.message);
        });

    if(localStorage.getItem(corisXUserToken) && localStorage.getItem(corisXUserDatas)) {
      
      setPage(page + 1);
      
      setLoader(true);

      fetch( baseUrl + 'articles/articlesbypage?q=bitcoin&Numb=9&page=' + page)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
           setPosts(posts.contat(data.data));
           setLoader(false);
        })
        .catch((err) => {
           console.log(err.message);
        });

    }
    else {

    }

  };

  return (
  
    <>
    
      <div className="body">

  <h1>Nos Articles 📄</h1>

        <div className="main_container">

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

            <h2 className="more">

                { !loader
                ? <a onClick={loadMoreArticles} >Voir plus d'article</a>
                : ''
                }
                
            </h2>

        </div>

      </div>
    
    </>

  );
}