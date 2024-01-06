/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { baseUrl, capitalize, corisXUserDatas, corisXUserToken } from "../utils/utils";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Delete, Favorite } from "@mui/icons-material";

function Crypto(){

    const [cryptos, setCryptos] = useState([]);
    const [cryptoloader, setCryptoLoader] = useState(true);

    const navigate = useNavigate();
    
    const navigateToLogin = () => {
      navigate('/auth/login');
    };

    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem(corisXUserDatas)));
  
    const token = localStorage.getItem(corisXUserToken)

    useEffect(() => {
      
    console.log(userData)

    
     let config = {
       headers: {
         'Authorization': 'Bearer ' + token
       }
     }

    if (userData) {
    
     fetch( baseUrl + 'users/user?username=' + userData.username , config)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // console.log(userData.favCryptos?.filter((crypt) => crypt.symbol === 'bitcoin'))
          setUserData(data.data)
          localStorage.setItem(corisXUserDatas, JSON.stringify(data.data));
        })
        .catch((err) => {
           console.log(err);
        });
       
     } 
              
        setCryptoLoader(true);

        fetch( baseUrl + 'anonym?identifier=Value1')
        .then((response) => response.json())
        .then((data) => {
            
            const _maxCryptos = data.data.maxCryptView;

            sessionStorage.setItem('maxCryptos', _maxCryptos);
            sessionStorage.setItem('page', 1);

            setTimeout(() => {
                loadCryptos();
            }, 500);

        })
        .catch((err) => {
           console.log(err);
        });
        
    }, []);
  
    const loadCryptos = () => {

                fetch( baseUrl + `cryptos/cryptosbypage?q=bitcoin&Numb=${sessionStorage.getItem('maxCryptos')}&page=${sessionStorage.getItem('page')}`)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setCryptos(data.data);
                        setCryptoLoader(false);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });

    };
  
    const changePage = () => {
              
        sessionStorage.setItem('page', parseInt(sessionStorage.getItem('page')) + 1);

    };
  
    const loadMoreCryptos = () => {

      if(localStorage.getItem(corisXUserToken) && localStorage.getItem(corisXUserDatas)) {
                      
        changePage()
        
        setCryptoLoader(true);

          setTimeout(() => {
                        
            fetch( baseUrl + `cryptos/cryptosbypage?q=bitcoin&Numb=${sessionStorage.getItem('maxCryptos')}&page=${sessionStorage.getItem('page')}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setCryptos([...cryptos, ...data.data]);
                    setCryptoLoader(false);
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

    const addToFavoriteCrypto = async(crypto) => {
      
      const fav = {
          "symbol": crypto.id,
          "cryptoname": crypto.name,
          "username": userData.username
      }

     let config = {
       headers: {
         'Authorization': 'Bearer ' + token
       }
     }

     try {

       const response = await axios.post( baseUrl + 'users/addcrypto', fav, config);

       if(response) {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
       }

     } catch (error) {
     } finally {
     }

    };
  
    const removeToFavoriteCrypto = async(crypto) => {
      
      const fav = {
          "cryptoname": crypto.name,
          "username": userData.username
      }

     let config = {
       headers: {
         'Authorization': 'Bearer ' + token
       }
     }

     try {

       const response = await axios.delete( baseUrl + 'users/deletecrypto', fav, config);

       if(response) {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
       }

     } catch (error) {
     } finally {
     }
      
    };

    return (
        
        <>
            <div className=""
                style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/planes-logs.appspot.com/o/headerbg.png?alt=media&token=3c3faf10-9a56-49d2-8abb-2c35d513cde5')", height: "25rem" }}>

                <Header/>

                <div className="main_container header search_bar" style={{ marginTop: "1rem" }}>

                    <div style={{ width: "fit-content" }}>

                    <h1>Market - Faites vos achat</h1>

                        {/* <input className="search" placeholder="Besoin de vous documenter, allez-y...."/>  */}

                    </div>

                    <coingecko-coin-converter-widget coin-id="bitcoin" currency="usd"
                        background-color="#ffffff" font-color="#4c4c4c" locale="fr">
                    </coingecko-coin-converter-widget>

                </div>

                <div className="main_container" style={{ marginTop: "1rem" }}>

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

                </div>

            </div>

            <div className="body">

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
                                        {
                                            userData
                                            
                                            ? 

                                            <TableCell align="right">Actions</TableCell>

                                            : ''

                                        }
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

                                          {
                                            userData
                                            
                                            ? 

                                            <div className="d-flex">

                                              {
                                                
                                                userData.favCryptos?.filter((crypt) => crypt.symbol === row.id).length > 0
                                                
                                                ?
                                                  
                                                <IconButton onClick={ () => removeToFavoriteCrypto(row)} color="secondary" title="Retirer des Favoris">
                                                  <Delete />
                                                </IconButton>
                                 
                                                : 
                                                  
                                                <IconButton onClick={ () => addToFavoriteCrypto(row)} color="warning" title="Ajouter en favoris">
                                                    <Favorite />
                                                </IconButton>

                                              }
                                                
                                                
                                            </div>

                                            : ''

                                          }
                                                                                   
                                        </TableCell>

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
                        ? <a onClick={loadMoreCryptos}>Voir plus de crypto 🪙</a>
                        : ''
                        }
                        
                    </h2>

                </div>

            </div>
        </>
    )
}

export default Crypto;