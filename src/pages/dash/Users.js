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
import ListItemIcon from '@mui/material/ListItemIcon'
import { DashboardCustomize } from '@mui/icons-material';
import { Money } from '@mui/icons-material';
import { Settings } from '@mui/icons-material';
import { Person } from '@mui/icons-material';

import './dash.css';
import { Newspaper } from '@mui/icons-material';
import { VerifiedUserTwoTone } from '@mui/icons-material';
import { PowerOff } from '@mui/icons-material';
import { baseUrl, capitalize, corisXUserDatas, corisXUserToken } from '../../utils/utils';
import { Navigate } from "react-router-dom";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

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

export default function Users() {

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
  const [users, setUsers] = useState([]);
  const [userloader, setUserLoader] = useState(true);
  // const [userloader, setUserLoader] = useState(true);
  // const [posts, setPosts] = useState([]);
  // let totalPosts = undefined;
  // const [loader, setLoader] = useState(true);
  // const [page, setPage] = useState(1);

  const logout = () => {
    localStorage.removeItem(corisXUserDatas)
    localStorage.removeItem(corisXUserToken)
    // eslint-disable-next-line no-restricted-globals
    location.reload();
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
          //  totalPosts = data.data;
           setUsers(data.data);

          // setLoader(false);
        })
        .catch((err) => {
           console.log(err);
           setUserLoader(false);
        });
  }, []);


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
            <ListItem key={'users'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                    <Money />
                </ListItemIcon>
                <a href="/dash/users" className="menuLink"> users </a>
                {/* <ListItemText primary={'users'} /> */}
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

            <div className="body">

                <div className="main_container">

                    <h2>Nos users</h2>

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

                              { users.length > 0 
                              ? 

                                <TableBody>

                                  {users.map((row) => (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left" component="th" scope="row"> { users.indexOf(row) + 1 } </TableCell>
                                            <TableCell align="left" scope="row">
                                                <img className="coin_logo" src={`https://api.dicebear.com/7.x/open-peeps/svg?seed=${row.firstname}+${row.lastname}`} alt="Logo" />
                                                <span>{row.firstname} {row.lastname} </span>
                                            </TableCell>
                                            <TableCell align="right">{row.username}</TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                            <TableCell align="right">{row.favCryptos}</TableCell>
                                            <TableCell align="right">{row.keywords}</TableCell>
                                            <TableCell align="right">{row.role}</TableCell>
                                            <TableCell align="right">--</TableCell>
                                        </TableRow>
                                  ))}

                                </TableBody>

                              : ''
                              }
                              

                        </Table>
                        </TableContainer>

                        { userloader
                        ? <h2 className="text-center" >Chargement....</h2>
                        : ''
                        }

                    </div>

                    <h2 className="more">

                        { !userloader
                        ? <a href="/users">Voir plus de crypto 🪙</a>
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