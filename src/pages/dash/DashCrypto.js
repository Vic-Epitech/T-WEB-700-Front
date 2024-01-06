/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { baseUrl, capitalize, corisXUserDatas, corisXUserToken } from '../../utils/utils';
import { useNavigate } from "react-router-dom";

export default function Cryptos() {


    const [cryptos, setCryptos] = useState([]);
    const [cryptoloader, setCryptoLoader] = useState(true);

    const navigate = useNavigate();
    
    const navigateToLogin = () => {
      navigate('/auth/login');
    };

    useEffect(() => {
              
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

  return (
    
    <>
    
      <div className="">

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

            <coingecko-coin-price-marquee-widget coin-ids="bitcoin,ethereum,eos,ripple,litecoin"
                currency="usd" background-color="#ffffff" locale="fr">
            </coingecko-coin-price-marquee-widget>

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
                                <TableCell align="right">${row.current_price}</TableCell>
                                <TableCell align="right">${row.low_24h} / ${row.high_24h}</TableCell>
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
              ? <a onClick={loadMoreCryptos}>Voir plus de crypto 🪙</a>
              : ''
              }
              
          </h2>

      </div>

      </div>
    
    </>
    
  );
}