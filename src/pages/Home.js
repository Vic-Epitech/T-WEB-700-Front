/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Header from "./Header";
import reduceText, { baseUrl, capitalize } from "../utils/utils"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// function getArticles () {

// }

function Home(){

    const [posts, setPosts] = useState([]);
    const [loader, setLoader] = useState(true);

    const [cryptos, setCryptos] = useState([]);
    const [cryptoloader, setCryptoLoader] = useState(true);

    const [page] = useState(1);

    useEffect(() => {

       setLoader(true);

       fetch( baseUrl + 'articles/articlesbypage?q=bitcoin&Numb=3&page=' + page)
          .then((response) => response.json())
          .then((data) => {
            //  console.log(data);
             setPosts(data.data);
             setLoader(false);
          })
          .catch((err) => {
             console.log(err.message);
          });
          

       fetch( baseUrl + 'cryptos/cryptosbypage?q=bitcoin&Numb=12&page=' + page)
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          setCryptos(data.data);
          setCryptoLoader(false);
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
                            ? <a href="/blog">Voir plus d'article</a>
                            : ''
                            }
                            
                        </h2>

                    </div>

                    <div className="main_container">

                        <h2>Nos Cryptos</h2>

                        <div className="latest_articles">
                            
                            <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">#</TableCell>
                                        <TableCell align="left">Nom</TableCell>
                                        <TableCell align="right">Prix($)</TableCell>
                                        <TableCell align="right">Min / Max (24h)</TableCell>
                                        {/* <TableCell align="right">24h %</TableCell>
                                        <TableCell align="right">7d %</TableCell> */}
                                        <TableCell align="right">Cap du Marché</TableCell>
                                        <TableCell align="right">Max d'approvisionnement</TableCell>
                                        <TableCell align="right">Volume Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cryptos.map((row) => (
                                    <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left" component="th" scope="row"> { cryptos.indexOf(row) + 1 } </TableCell>
                                        <TableCell align="left" scope="row">
                                            <img className="coin_logo" src={row.image} alt="Logo" />
                                            <span>{row.name} </span>
                                            ( <span>{capitalize(row.symbol) }</span> )
                                        </TableCell>
                                        <TableCell align="right">${row.current_price}</TableCell>
                                        <TableCell align="right">${row.low_24h} / ${row.high_24h}</TableCell>
                                        {/* <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.calories}</TableCell> */}
                                        <TableCell align="right">{row.market_cap}</TableCell>
                                        <TableCell align="right" scope="row">{row.max_supply}  ( <span>{ capitalize(row.symbol) }</span> )</TableCell>
                                        <TableCell align="right" scope="row">{row.total_volume} ( <span>{ capitalize(row.symbol) }</span> )</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            </TableContainer>

                            { cryptoloader
                            ? <h2 className="text-center" >Chargement....</h2>
                            : ''
                            }

                        </div>

                        <h2 className="more">

                            { !cryptoloader
                            ? <a href="/cryptos">Voir plus de crypto 🪙</a>
                            : ''
                            }
                            
                        </h2>

                    </div>

            </div>
        </>
    )
}

export default Home;