/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */

import React, { useEffect, useState } from "react";

import './dash.css';
import reduceText, { baseUrl, capitalize, corisXUserDatas, corisXUserToken } from '../../utils/utils';
import { Navigate } from "react-router-dom";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const drawerWidth = 240;


export default function Dashboard() {


  const userData = JSON.parse(localStorage.getItem(corisXUserDatas));
  const [posts, setPosts] = useState([]);
  let totalPosts = undefined;
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  
  const [cryptos, setCryptos] = useState([]);
  const [loadingCryptos, setloadingCryptos] = useState(true);

  const token = localStorage.getItem(corisXUserToken)


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
    
     let config = {
       headers: {
         'Authorization': 'Bearer ' + token
       }
     }


     setLoader(true);

    // https://countofmoney.giize.com/articles/artmanykeys?keywordslist=gold,bitcoin
    //  fetch( baseUrl + 'articles/articlesbypage?q=bitcoin&Numb=6&page=' + page)

     fetch( baseUrl + `articles/artmanykeys?keywordslist=${userData.keywords?.map((row, index) => ( `${row}${index === userData.keywords.length - 1 ? '' : ','}` )).join('')}&Numb=6&page=${page}`, config)
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
           totalPosts = data.data;
           setPosts(totalPosts);

          setLoader(false);
          //  console.log(loader);
        })
        .catch((err) => {
           console.log(err.message);
        });
    
    
     fetch( baseUrl + `cryptos/cryptosmanykeys?keywords=${userData.favCryptos?.map((row, index) => ( `${row.cryptoname}${index === userData.favCryptos.length - 1 ? '' : ','}` )).join('')}`, config)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCryptos(data.data);
          setloadingCryptos(false);
        })
        .catch((err) => {
           console.log(err.message);
        });
    
  }, []);

  return (
        
    <>
        
        <div className="main_container dashContainer" style={{ marginTop: "1rem" }}>
                
                  <h3>Le cours de vos cryptos favorite</h3>

                  {
                                                
                      userData.favCryptos?.length > 0
                                                
                      ?
                                                  
                      <coingecko-coin-price-marquee-widget coin-ids={userData.favCryptos?.map((row, index) => ( `${row.symbol}${index === userData.favCryptos.length - 1 ? '' : ','}` )).join('')}
                        currency="usd" background-color="#ffffff" locale="fr">
                      </coingecko-coin-price-marquee-widget>
                                 
                      : 
                                                  
                      <coingecko-coin-price-marquee-widget coin-ids="bitcoin,ethereum,eos,ripple,litecoin"
                        currency="usd" background-color="#ffffff" locale="fr">
                      </coingecko-coin-price-marquee-widget>

        }
        
        
                  <h3>Mes Cryptos favorite</h3>

                        <div className="latest_articles  step__4">
                            
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
                                    {cryptos?.map((row) => (
                                      
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
                                        <TableCell align="right" className="step__5">${row.current_price}</TableCell>
                                        <TableCell align="right" className="step__6">${row.low_24h} / ${row.high_24h}</TableCell>
                                        <TableCell align="right">{row.market_cap}</TableCell>
                                        <TableCell align="right" scope="row">{row.max_supply}  ( <span>{ capitalize(row.symbol) }</span> )</TableCell>
                                        <TableCell align="right" scope="row" className="step__7">{row.total_volume} ( <span>{ capitalize(row.symbol) }</span> )</TableCell>
                                        <TableCell align="right" scope="row">

                                                                              
                                        </TableCell>

                                    </TableRow>
                                      
                                    ))}
                    
                                </TableBody>
                                
                            </Table>
                            
                            </TableContainer>

                            { loadingCryptos
                            ? <h2 className="text-center" >Chargement....</h2>
                            : ''
                            }

                        </div>

                
                  <h3>Presse Review</h3>

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



                </div>

    </>

  );
}