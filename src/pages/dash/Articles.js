/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import './dash.css';
import reduceText, { baseUrl, corisXUserDatas, corisXUserToken } from '../../utils/utils';
import { Navigate, useNavigate } from "react-router-dom";

export default function Articles() {


    const [posts, setPosts] = useState([]);
    let totalPosts = undefined;
    const [loader, setLoader] = useState(true);
    
    const navigate = useNavigate();

    const navigateToLogin = () => {
      navigate('/auth/login');
    };

    useEffect(() => {
              
        setLoader(true);

        fetch( baseUrl + 'anonym?identifier=Value1')
        .then((response) => response.json())
        .then((data) => {
            
            const _maxArticle = data.data.maxArticleView;

            sessionStorage.setItem('maxArticle', _maxArticle);
            sessionStorage.setItem('page', 1);

            setTimeout(() => {
                loadArticles();
            }, 500);

        })
        .catch((err) => {
           console.log(err);
        });
        
    }, []);
  
    const loadArticles = () => {

                fetch( baseUrl + `articles/articlesbypage?q=bitcoin&Numb=${sessionStorage.getItem('maxArticle')}&page=${sessionStorage.getItem('page')}`)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        totalPosts = data.data;
                        setPosts(totalPosts);
                        setLoader(false);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });

    };
  
    const changePage = () => {
              
        sessionStorage.setItem('page', parseInt(sessionStorage.getItem('page')) + 1);

    };
  
    const loadMoreArticles = () => {

      if(localStorage.getItem(corisXUserToken) && localStorage.getItem(corisXUserDatas)) {
                      
        changePage()
        
        setLoader(true);

          setTimeout(() => {
                        
            fetch( baseUrl + `articles/articlesbypage?q=bitcoin&Numb=${sessionStorage.getItem('maxArticle')}&page=${sessionStorage.getItem('page')}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setPosts([...posts, ...data.data]);
                    setLoader(false);
                })
                .catch((err) => {
                    console.log(err.message);
                });

        }, 100);

      }
      else {
          
          navigateToLogin();

      }

    };

  return (
  
    <>
    
      <div className="body">

  <h1>Nos Articles 📄</h1>

        <div className="main_container">

            <div className="latest_articles">

                <div className="row  gx-5">

                    {posts?.map((post) => {
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