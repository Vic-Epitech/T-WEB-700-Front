/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Header from "./Header";
import reduceText, { baseUrl, capitalize, corisXUserDatas, corisXUserToken } from "../utils/utils"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useMount, useSetState } from 'react-use';


import a11yChecker from 'a11y-checker';
import { IconButton } from "@mui/material";
import { Delete, Favorite } from "@mui/icons-material";
import axios from "axios";


function Home(){

    const [posts, setPosts] = useState([]);
    const [loader, setLoader] = useState(true);

    const [cryptos, setCryptos] = useState([]);
    const [cryptoloader, setCryptoLoader] = useState(true);

    const [page] = useState(1);
    
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
          // console.log(userData.favCryptos?.map((row, index) => ( `${row.symbol}${index === userData.favCryptos.length - 1 ? '' : ','}` )))
          // console.log(userData.favCryptos?.map((row, index) => ( `${row.symbol}${index === userData.favCryptos.length - 1 ? '' : ','}` )).join(''))
        })
        .catch((err) => {
           console.log(err);
        });
       
     } 
         
        fetch( baseUrl + 'anonym?identifier=Value1')
        .then((response) => response.json())
        .then((data) => {
            setLoader(true);
            getArticles(3);
            getCryptos(data.data.maxCryptView);
        })
        .catch((err) => {
           console.log(err);
        });


    }, []);
  
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
  
  const removeToFavoriteCrypto = async (crypto) => {
      
    console.log(crypto);
      
     let config = {
       headers: {
         'Authorization': 'Bearer ' + token
       }
     }

     try {

       const response = await axios.delete( baseUrl + `users/deletecrypto?username=${userData.username}&cryptoname=${crypto.name}`, config);

       if(response) {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
       }

     } catch (error) {
     } finally {
     }
      
    };

    // guided tour
    const [{ run, steps }, setState] = useSetState({
      run: true,
      steps: [
        {
          content: <h5>Bienvenu sur Coris X-change !</h5>,
          locale: { skip: <strong aria-label="skip">Zapper 🙂</strong> },
          placement: 'center',
          target: 'body',
        },
        {
          content: <h5>Faites vos conversion avec exactitude !</h5>,
          locale: { skip: <strong aria-label="skip">Zapper 🙂</strong> },
          placement: 'left',
          target: '.step__1',
        },
        {
          content: <h5>Retrouvez le cours de vos cryptos favorites.</h5>,
          locale: { skip: <strong aria-label="skip">Zapper 🙂</strong> },
          placement: 'bottom',
          target: '.step__2',
        },
        {
          content: <h5>Nous vous informons sur les sujet qui vous interessent</h5>,
          locale: { skip: <strong aria-label="skip">Zapper 🙂</strong> },
          placement: 'bottom',
          target: '.step__3',
        },
        {
          content: <h5>Vous avez les informations générales des cyptos en vogue et de vos cypros favorites.</h5>,
          locale: { skip: <strong aria-label="skip">Zapper 🙂</strong> },
          placement: 'top',
          target: '.step__4',
        },
        {
          content: <h5>Le prix actuel de la crypto.</h5>,
          locale: { skip: <strong aria-label="skip">Zapper 🙂</strong> },
          placement: 'left',
          target: '.step__5',
        },
        {
          content: <h5>Les flucuations extrêmes.</h5>,
          locale: { skip: <strong aria-label="skip">Zapper 🙂</strong> },
          placement: 'top',
          target: '.step__6',
        },
        {
          content: <h5>Le volume total de la crypto en circulation.</h5>,
          locale: { skip: <strong aria-label="skip">Zapper 🙂</strong> },
          placement: 'bottom',
          target: '.step__7',
        },
        {
          content: <h5>Vous avez la possibilité de changer la devise en laquelle vous voulez avoir les informations</h5>,
          locale: { skip: <strong aria-label="skip">Zapper 🙂</strong> },
          placement: 'bottom',
          target: '.step__8',
        },
        {
          content: <h5>Faudra vous connecter pour avoir plus de choix d'actions.</h5>,
          locale: { skip: <strong aria-label="skip">Zapper 🙂</strong> },
          placement: 'bottom',
          target: '.step__9',
        },
      ],
    });
  
    const getArticles = (numb) => {

       fetch( baseUrl + `articles/articlesbypage?q=bitcoin&Numb=${numb}&page=1`)
          .then((response) => response.json())
          .then((data) => {
             setPosts(data.data);
             setLoader(false);
          })
          .catch((err) => {
             console.log(err.message);
          });
      
    };
  
    const getCryptos = (numb) => {          

       fetch( baseUrl +  `cryptos/cryptosbypage?q=bitcoin&Numb=${numb}&page=1`)
       .then((response) => response.json())
       .then((data) => {
          setCryptos(data.data);
          setCryptoLoader(false);
       })
       .catch((err) => {
          console.log(err.message);
       });
      
    };
  
    useMount(() => {
      a11yChecker();
    });
  
    const handleClickStart = (event) => {
      event.preventDefault();
  
      setState({
        run: true,
      });
    };
  
    const handleJoyrideCallback = (data) => {
      const { status, type } = data;
      const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
  
      if (finishedStatuses.includes(status)) {
        setState({ run: false });
      }
  
    //   logGroup(type, data);
    };

    return (
        
        <>

            <Joyride
                callback={handleJoyrideCallback}
                continuous
                hideCloseButton
                run={run}
                scrollToFirstStep
                showProgress
                showSkipButton
                steps={steps}
                styles={{
                    options: {
                    zIndex: 10000,
                    },
                }}
            />

            {/* <a onClick={handleClickStart} style={{cursor: "pointer"}} className="login">Start</a> */}

            <div className=""

                style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/planes-logs.appspot.com/o/headerbg.png?alt=media&token=3c3faf10-9a56-49d2-8abb-2c35d513cde5')", height: "25rem" }}>

                <Header/>

                <div className="main_container header search_bar" style={{ marginTop: "1rem" }}>

                    <div style={{ width: "fit-content" }}>

                        <h2 className="" >"Connectez vos aspirations financières avec notre plateforme d'échange de cryptomonnaie – Où chaque transaction façonne votre avenir financier!"</h2>

                        {/* <input className="search" placeholder="Besoin de vous documenter, allez-y...."/>  */}

                    </div>

                    {/* <div className="">

                    </div> */}

                    <div className="step__1">

                        <coingecko-coin-converter-widget coin-id="bitcoin" currency="usd"
                            background-color="#ffffff" font-color="#4c4c4c" locale="fr">
                        </coingecko-coin-converter-widget>

                    </div>

                </div>

                <div className="main_container step__2" style={{ marginTop: "1rem" }}>

                    {
                                                
                      userData?.favCryptos?.length > 0
                                                
                      ?
                                                  
                      <coingecko-coin-price-marquee-widget coin-ids={userData?.favCryptos?.map((row, index) => ( `${row.symbol}${index === userData?.favCryptos?.length - 1 ? '' : ','}` )).join('')}
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

                        <h2>Dernières articles</h2>

                        <div className="latest_articles">

                            <div className="row  gx-5 step__3">

                                {posts?.map((post) => {
                                    return (
                                        <a className="col-12 col-md-4" key={ post.title } href={ post.url } target="_blank">

                                            <div className="article">

                                                <img className="article_cover" src={ post.urlToImage } alt="cover" />

                                                <div className="article_details">

                                                    <h2>{ post.title }</h2>

                                                    <h3>{ reduceText(post.description) }</h3>

                                                    <h5>Publié le : <span>{ post.publishedAt }</span> </h5>

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
                                                
                                                userData?.favCryptos?.filter((crypt) => crypt.symbol === row.id).length > 0
                                                
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