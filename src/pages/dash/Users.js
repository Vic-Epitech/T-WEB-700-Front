/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { baseUrl, corisXUserDatas, corisXUserToken } from '../../utils/utils';
import { Navigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";

export default function Users() {

  const userData = JSON.parse(localStorage.getItem(corisXUserDatas));
  const token = localStorage.getItem(corisXUserToken)
  const [users, setUsers] = useState([]);
  const [userloader, setUserLoader] = useState(true);
  const [user, setUser] = useState();

  const selectUser = (_user) => {
    setUser(_user)
    handleClickOpen();
  }

  const deleteUser = async () => {
    
     let config = {
       headers: {
         'Authorization': 'Bearer ' + token
       }
     }

      try {

        const response = await axios.delete( baseUrl + 'users/user?username=' + user.username, config);
         console.log(response.data); // Handle successful login
  
         if(response.data) {
          // eslint-disable-next-line no-restricted-globals
          location.reload();
         }
         else {
           //   setError(true);
         }
  
       } catch (error) {
         console.error('Login failed', error);
       } finally {
       }

    
  };

  useEffect(() => {

    if(!userData) {
      Navigate('/');
    }

    setUserLoader(true);

    //  setLoader(true);
     let config = {
       headers: {
         'Authorization': 'Bearer ' + token
       }
     }

     fetch( baseUrl + 'users/', config)
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
           setUserLoader(false);
           setUsers(data.data);

          // setLoader(false);
        })
        .catch((err) => {
           console.log(err);
           setUserLoader(false);
        });
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    
    <>
    
    <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Supression de Compte"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                        { user
                        ? 
                          <h2 >
                            Voulez-vous vraiment suprimer: {user.firstname} {user.lastname} ??
                          </h2>
                        : ''
                        }

                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={ () => handleClose}>Non, Je refuse</Button>
                <Button onClick={ () => deleteUser()} autoFocus>
                  D'accords
                </Button>
              </DialogActions>
            </Dialog>

            <div className="body">

                <div className="main_container">

                    <h2>Nos Utilisateurs</h2>

                    <div className="latest_articles">
                        
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">#</TableCell>
                                    <TableCell align="left">Nom</TableCell>
                                    <TableCell align="right">Username</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Cryptos Favorite</TableCell>
                                    <TableCell align="right">Mots clés favoris</TableCell>
                                    <TableCell align="right">Role</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>

                              {/* { users.length > 0 
                              ? 

                                <TableBody>

                                  {users.map((row) => (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left" component="th" scope="row"> { users.indexOf(row) + 1 } </TableCell>
                                            <TableCell align="left" scope="row">
                                                <img className="coin_logo" src={`https://api.dicebear.com/7.x/open-peeps/svg?seed=${row.firstname}+${row.lastname}`} alt="user avatar" />
                                                <span>{row.firstname} {row.lastname} </span>
                                            </TableCell>
                                            <TableCell align="right">{row.username}</TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                            <TableCell align="right">{row.favCryptos}</TableCell>
                                            <TableCell align="right">{row.keywords}</TableCell>
                                            <TableCell align="right">{row.role}</TableCell>
                                            <TableCell align="right">
                                              <button type="button" onClick={ () => selectUser(row)} className="btn-delete">
                                                Delete
                                              </button>
                                            </TableCell>
                                        </TableRow>
                                  ))}

                                </TableBody>

                              : ''
                              } */}

                              <TableBody>

                                  {users.map((row) => (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left" component="th" scope="row"> { users.indexOf(row) + 1 } </TableCell>
                                            <TableCell align="left" scope="row">
                                                <img className="coin_logo" src={`https://api.dicebear.com/7.x/open-peeps/svg?seed=${row.firstname}+${row.lastname}`} alt="user avatar" />
                                                <span>{row.firstname} {row.lastname} </span>
                                            </TableCell>
                                            <TableCell align="right">{row.username}</TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                            <TableCell align="right">{row.favCryptos}</TableCell>
                                            <TableCell align="right">{row.keywords}</TableCell>
                                            <TableCell align="right">{row.role}</TableCell>
                                            <TableCell align="right">
                                              <button type="button" onClick={ () => selectUser(row)} className="btn-delete">
                                                Delete
                                              </button>
                                            </TableCell>
                                        </TableRow>
                                  ))}

                              </TableBody>
                              

                        </Table>
                        </TableContainer>

                        { userloader
                        ? <h2 className="text-center" >Chargement....</h2>
                        : ''
                        }

                    </div>

                </div>

            </div>

    </>

  );
}