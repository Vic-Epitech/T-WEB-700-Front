/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Header from "./Header";
import reduceText, { baseUrl, corisXUserDatas, corisXUserToken } from "../utils/utils"
import { useNavigate } from "react-router-dom";

function Blog(){

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
        
            <div className=""
                style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/planes-logs.appspot.com/o/headerbg.png?alt=media&token=3c3faf10-9a56-49d2-8abb-2c35d513cde5')", height: "25rem" }}>

                <Header/>

                <div className="main_container header search_bar" style={{ marginTop: "1rem" }}>

                    <div style={{ width: "fit-content" }}>

                        <h1>Blog - Apprenez plus 💡</h1>

                    </div>

                </div>

            </div>

            <div className="body">

                    <div className="main_container">

                        <div className="latest_articles">

                            <div className="row  gx-5">

                                {posts?.map((post, index) => {
                                    return (
                                        <a className="col-12 col-md-4" key={ post.title + index } href={ post.url } target="_blank" rel="noreferrer">

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
    )
}

export default Blog;