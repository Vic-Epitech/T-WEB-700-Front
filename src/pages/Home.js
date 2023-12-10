/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Header from "./Header";

function Home(){
    return (
        
        <>
            <div className=""
                style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/planes-logs.appspot.com/o/headerbg.png?alt=media&token=3c3faf10-9a56-49d2-8abb-2c35d513cde5')", height: "25rem" }}>

                <Header/>

                <div className="main_container header search_bar" style={{ marginTop: "1rem" }}>

                    <div style={{ width: "fit-content" }}>

                        <h2>"Connectez vos aspirations financières avec notre plateforme d'échange de cryptomonnaie – Où chaque transaction façonne votre avenir financier!"</h2>

                        {/* <input className="search" placeholder="Besoin de vous documenter, allez-y...."/>  */}

                    </div>

                    <coingecko-coin-converter-widget coin-id="bitcoin" currency="usd"
                        background-color="#ffffff" font-color="#4c4c4c" locale="fr">
                    </coingecko-coin-converter-widget>

                </div>

                <div className="main_container" style={{ marginTop: "1rem" }}>

                    <coingecko-coin-price-marquee-widget coin-ids="bitcoin,ethereum,eos,ripple,litecoin"
                        currency="usd" background-color="#ffffff" locale="fr">
                    </coingecko-coin-price-marquee-widget>

                </div>

            </div>

            <div className="body">

                    <div className="main_container">

                        <h2>Dernières articles</h2>

                        <div className="latest_articles">

                            <div className="row  gx-5">

                                <a className="col-12 col-md-4" href="#">

                                    <div className="article">

                                        <img className="article_cover" src={"../img/blog/article_1.webp"} alt="cover" />

                                        <div className="article_details">

                                            <h2>Binance lance la série de contenus « La crypto, c’est mieux avec Binance » mettant en avant le parcours</h2>

                                            <h3>Des millions de personnes à travers le monde utilisent la cryptomonnaie chaque jour pour prendre le contrôle de leurs finances, que ce soit pour changer de carrière en Afrique ou pour compenser l’inflation en Asie : chacun a sa propre histoire. </h3>

                                            <h4>Publié le : <span>2023-11-30</span> </h4>

                                        </div>

                                    </div>

                                </a>

                                <a className="col-12 col-md-4" href="#">

                                    <div className="article">

                                        <img className="article_cover" src={"../img/blog/article_1.webp"} alt="cover" />

                                        <div className="article_details">

                                            <h2>Binance lance la série de contenus « La crypto, c’est mieux avec Binance » mettant en avant le parcours</h2>

                                            <h3>Des millions de personnes à travers le monde utilisent la cryptomonnaie chaque jour pour prendre le contrôle de leurs finances, que ce soit pour changer de carrière en Afrique ou pour compenser l’inflation en Asie : chacun a sa propre histoire. </h3>

                                            <h4>Publié le : <span>2023-11-30</span> </h4>

                                        </div>

                                    </div>

                                </a>

                                <a className="col-12 col-md-4" href="#">

                                    <div className="article">

                                        <img className="article_cover" src={"../img/blog/article_1.webp"} alt="cover" />

                                        <div className="article_details">

                                            <h2>Binance lance la série de contenus « La crypto, c’est mieux avec Binance » mettant en avant le parcours</h2>

                                            <h3>Des millions de personnes à travers le monde utilisent la cryptomonnaie chaque jour pour prendre le contrôle de leurs finances, que ce soit pour changer de carrière en Afrique ou pour compenser l’inflation en Asie : chacun a sa propre histoire. </h3>

                                            <h4>Publié le : <span>2023-11-30</span> </h4>

                                        </div>

                                    </div>

                                </a>

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

export default Home;