import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import SearchIcon from '@material-ui/icons/Search';
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import { Link } from '@material-ui/core'
import UserContext from '../../utils/UserContext'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  mobileHeader: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  XLHeader: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  logoImg: {
    width: 125,
    height: '100%',
  },
  link: {
    color: 'black'
  }
}));

export default function TemporaryDrawer() {
  const [headerState] = useState({
    anchor: 'left',
    anchorXL: 'top'
  })

  const classes = useStyles();

  const { handleLogOut } = useContext(UserContext)

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open, menu: true });
  };



  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Link href="/" className={classes.link}>
        <List>
          <ListItem button key='Search Plants'>
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText primary='Search Plants' />
          </ListItem>
        </List>
      </Link>
      
      <Link href={`/creategarden/${localStorage.getItem('id')}`} className={classes.link}>
        <List>
          <ListItem button key='Create Gardens'>
            <ListItemIcon><EmojiNatureIcon /></ListItemIcon>
            <ListItemText primary='Create Gardens' />
          </ListItem>
        </List>
      </Link>

      <Link href={`/user/${localStorage.getItem('id')}`} className={classes.link}>
        <List>
          <ListItem button key='View Gardens'>
            <ListItemIcon><LocalFloristIcon /></ListItemIcon>
            <ListItemText primary='View Gardens' />
          </ListItem>
        </List>
      </Link>
      <Link href={`/info/${localStorage.getItem('id')}`} className={classes.link}>
        <List>
          <ListItem button key='Profile Info'>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText primary='Profile Info' />
          </ListItem>
        </List>
      </Link>
      <Divider />
      <List onClick={handleLogOut}>
        <ListItem button key='Log Out' onClick={handleLogOut}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary='Log Out' />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <div className={classes.root}>
        <React.Fragment key={headerState.anchor}>
          <Button className={classes.mobileHeader} onClick={toggleDrawer(headerState.anchor, true)}><MenuIcon /></Button>
          <Drawer className={classes.mobileHeader} anchor={headerState.anchor} open={state[headerState.anchor]} onClose={toggleDrawer(headerState.anchor, false)}>
            {list(headerState.anchor)}
          </Drawer>
        </React.Fragment>
        <React.Fragment key={headerState.anchorXL}>
          <Button className={classes.XLHeader} onClick={toggleDrawer(headerState.anchorXL, true)}><MenuIcon /></Button>
          <Drawer className={classes.XLHeader} anchor={headerState.anchorXL} open={state[headerState.anchorXL]} onClose={toggleDrawer(headerState.anchorXL, false)}>
            {list(headerState.anchorXL)}
          </Drawer>
        </React.Fragment>
        <Link href='/'>
          <img src='https://i.imgur.com/lwEAqtD.png' alt='garden-array-logo' className={classes.logoImg} />
        </Link>
      </div>
      <hr />
    </>
  );
}