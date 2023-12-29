import React, { useState } from "react";
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
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { baseUrl, capitalize, corisXUserDatas, corisXUserToken } from '../../utils/utils';
import { Navigate } from "react-router-dom";

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

export default function Cryptos() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuLinks = [
    {
        "title": "Dashboard",
        "icon": "<DashboardCustomize />"
    },
    {
        "title": "Cryptos",
        "icon": "<Money />"
    },
    {
        "title": "Configurations",
        "icon": "<Settings />"
    },
    {
        "title": "Profile",
        "icon": "<Person />"
    },
  ]

  const userData = JSON.parse(localStorage.getItem(corisXUserDatas));
  const [cryptos, setCryptos] = useState([]);
  const [cryptoloader, setCryptoLoader] = useState(true);

  const [page, setPage] = useState(1);

  const logout = () => {
    localStorage.removeItem(corisXUserDatas)
    localStorage.removeItem(corisXUserToken)
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  if(!userData) {
    Navigate('/');
  }


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


        </Typography>
      </Main>
    </Box>
  );
}