import * as React from 'react';
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
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { DashboardCustomize } from '@mui/icons-material';
import { Money } from '@mui/icons-material';
import { Settings } from '@mui/icons-material';
import { Person } from '@mui/icons-material';

import './dash.css';
import { Newspaper } from '@mui/icons-material';
import { VerifiedUserTwoTone } from '@mui/icons-material';
import { PowerOff } from '@mui/icons-material';

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

export default function Articles() {

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
           <a href="/" className="menuLink">
              <img style={{ width: "12rem"}} className="logo" src={"https://firebasestorage.googleapis.com/v0/b/planes-logs.appspot.com/o/long_logo2.png?alt=media&token=53846e2f-22bd-4645-a9f0-340d4454ab38"} alt="Logo" />
           </a>
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
                <a style={{cursor: "pointer"}} className="menuLink"> Déconexion </a>
                {/* <ListItemText primary={'Profile'} /> */}
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          Articles
        </Typography>
      </Main>
    </Box>
  );
}