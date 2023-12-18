/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Header from "./Header";
import reduceText from "../utils/utils"

function Blog(){

    const [posts, setPosts] = useState([]);

    useEffect(() => {
       fetch('https://api-t-web.onrender.com/articles/articlesbypage?q=crypto&Numb=9')
          .then((response) => response.json())
          .then((data) => {
             console.log(data);
             setPosts(data.data.page1);
          })
          .catch((err) => {
             console.log(err.message);
          });
    }, []);

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

                            </div>

                        </div>

                        <h2 className="more">
                            <a href="">Voir plus d'article</a>
                        </h2>

                    </div>

            </div>
        
        </>
    )
}

export default Blog;