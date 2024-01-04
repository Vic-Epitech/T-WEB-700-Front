/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { DashboardCustomize } from '@mui/icons-material';
import { Money } from '@mui/icons-material';
import { Settings } from '@mui/icons-material';
import { Person } from '@mui/icons-material';

import './dash.css';
import { Newspaper } from '@mui/icons-material';
import { VerifiedUserTwoTone } from '@mui/icons-material';
import { PowerOff } from '@mui/icons-material';
import { baseUrl, corisXUserDatas, corisXUserToken } from '../../utils/utils';
import { Navigate } from 'react-router-dom';
import axios from "axios";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export default function Profile() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  

  const userData = JSON.parse(localStorage.getItem(corisXUserDatas));
  const token = localStorage.getItem(corisXUserToken)
  const [user, setUser] = useState([]);
  const [userloader, setUserLoader] = useState(true);

  const [firstName, setFirstName] = useState(userData.firstname);
  const [lastName, setLastName] = useState(userData.lastname);
  const [userName, setUserName] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  
  const [loadingUserDatas, setLoadingUserDatas] = useState(false);
  
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [loadingPasswordDatas, setLoadingPasswordDatas] = useState(false);

  if(!userData) {
    Navigate('/');
  }

  const logout = () => {
    localStorage.removeItem(corisXUserDatas)
    localStorage.removeItem(corisXUserToken)
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  const changeDatas = async () => {
    
    const log = {
      "lastname": lastName,
      "firstname": firstName,
      "username": userName,
      "email": email
   }

     let config = {
       headers: {
         'Authorization': 'Bearer ' + token
       }
     }

     try {

      setLoadingUserDatas(true);

       const response = await axios.put( baseUrl + 'users/updateuserinfos', log, config);
       console.log(response.data); // Handle successful login

       if(response.data.data) {

        localStorage.setItem(corisXUserDatas, JSON.stringify(response.data.data))
        // eslint-disable-next-line no-restricted-globals
        location.reload();

       }
       else {
         //   setError(true);
       }

     } catch (error) {
       console.error('Login failed', error);
     } finally {
      setLoadingUserDatas(false);
     }

  };

  const changePassword = async () => {
    
      const log = {
        "email": email,
        "oldPassword": password,
        "newPassword": confirmpassword
    }

     let config = {
       headers: {
         'Authorization': 'Bearer ' + token
       }
     }

     try {

      setLoadingPasswordDatas(true);

       const response = await axios.put( baseUrl + 'users/password-update', log, config);
       console.log(response.data); // Handle successful login

       if(response.data) {

        logout()

       }
       else {
         //   setError(true);
       }

     } catch (error) {
       console.error('Login failed', error);
     } finally {
      setLoadingPasswordDatas(false);
     }
    
  };


  useEffect(() => {

    // console.log(userData)

    setUserLoader(true);

    //  setLoader(true);
     let config = {
       headers: {
         'Authorization': 'Bearer ' + token
       }
     }

     fetch( baseUrl + 'users/user?username=' + userData.username , config)
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
          //  totalPosts = data.data;
          //  setUser(data.data);

          // setLoader(false);
        })
        .catch((err) => {
           console.log(err);
           setUserLoader(false);
        });
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">

            <div className="main_container header">

              <a href="/" className="menuLink">
                            <img style={{ width: "12rem"}} className="logo" src={"https://firebasestorage.googleapis.com/v0/b/planes-logs.appspot.com/o/long_logo2.png?alt=media&token=53846e2f-22bd-4645-a9f0-340d4454ab38"} alt="Logo" />
              </a>

              <div style={{ display: "flex" }}>

                <h4 className="mgl">{userData.firstname} {userData.lastname}</h4>

              </div>

            </div>
            {/* Count Of Money */}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} color="inherit">
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem key={'Dashboard'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                    <DashboardCustomize />
                </ListItemIcon >
                <a href="/dash" className="menuLink"> Dashboard </a>
                {/* <ListItemText primary={'Dashboard'} /> */}
              </ListItemButton>
            </ListItem>
            <ListItem key={'Cryptos'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                    <Money />
                </ListItemIcon>
                <a href="/dash/cryptos" className="menuLink"> Cryptos </a>
                {/* <ListItemText primary={'Cryptos'} /> */}
              </ListItemButton>
            </ListItem>
            <ListItem key={'Articles'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                    <Newspaper />
                </ListItemIcon>
                <a href="/dash/articles" className="menuLink"> Articles </a>
                {/* <ListItemText primary={'Articles'} /> */}
              </ListItemButton>
            </ListItem>
            <ListItem key={'Users'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                    <VerifiedUserTwoTone />
                </ListItemIcon>
                <a href="/dash/users" className="menuLink"> Users </a>
                {/* <ListItemText primary={'Users'} /> */}
              </ListItemButton>
            </ListItem>
            <ListItem key={'Configurations'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                    <Settings />
                </ListItemIcon>
                <a href="/dash/settings" className="menuLink"> Configurations </a>
                {/* <ListItemText primary={'Configurations'} /> */}
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem key={'Profile'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                    <Person />
                </ListItemIcon>
                <a href="/dash/profile" className="menuLink"> Profile </a>
                {/* <ListItemText primary={'Profile'} /> */}
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem key={'Déconexion'} disablePadding>
              <ListItemButton style={{marginTop: "24em"}}>
                <ListItemIcon>
                    <PowerOff />
                </ListItemIcon>
                <a style={{cursor: "pointer"}} className="menuLink" onClick={logout}> Déconexion </a>
                {/* <ListItemText primary={'Profile'} /> */}
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>

          <div className="d-flex">

            <img className="profile_logo" src={`https://api.dicebear.com/7.x/open-peeps/svg?seed=${userData.firstname}+${userData.lastname}`} alt="Logo" />

            <h2 className="profile_name">{userData.firstname} {userData.lastname}</h2>

          </div>

          <div className="container">
          
            <div className="row gx-4">

              <form className="col-md-6 form_container">

                  <h4>Information de Compte</h4>

                  <div className="form_login row gy-4">

                      <div className="col-6">
                          <input type="text" className=""  value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom"/>
                      </div>

                      <div className="col-6">
                          <input type="text" className=""  value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom"/>
                      </div>

                      <div className="col-12">
                          <input type="text" className="" disabled value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username"/>
                      </div>

                      <div className="col-12">
                          <input type="email" className="" disabled  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                      </div>

                  </div>

                  <div className="form_login row actions">

                      <div className="col-10 action">
                          <input onClick={changeDatas} type="button" value={loadingUserDatas ? 'Changement d\'information...' : 'Valider'}/>
                      </div>

                  </div>

              </form>

              <form className="col-md-5 form_container ml-2rem">

                  <h4>Changement de mot de passe</h4>

                  <div className="form_login row gy-4">

                      <div className="col-12">
                          <input type="password" className=""  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ancien Mot de passe"/>
                      </div>

                      <div className="col-12">
                          <input type="password" className=""  value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Nouveau mot de passe"/>
                      </div>

                  </div>

                  <div className="form_login row actions">

                      <div className="col-10 action">
                          <input onClick={changePassword} type="button" value={loadingPasswordDatas ? 'Changement de mot de passe...' : 'Changer'}/>
                      </div>

                  </div>

              </form>

            </div>

          </div>

        </Typography>
      </Main>
    </Box>
  );
}