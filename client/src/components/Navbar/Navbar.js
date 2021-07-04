import React, {useState, useEffect} from 'react'
import useStyles from './styles';
import clsx from 'clsx';
import { useTheme, Button, Avatar, Badge, ClickAwayListener } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { categories } from '../../constants/items';
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../../actions/cart';

const Navbar = ({ open, setOpen }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  
  const logout = () => {
    dispatch({ type : 'LOGOUT' });
    history.push('/');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token){
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
    if (user?.result)
      dispatch(fetchCartItems({ userId : user?.result?._id }))
  }, [location, dispatch]);

  const cartItems = useSelector((state) => state.cart);
  let numberOfCartItems = 0;
  cartItems.map((item) => numberOfCartItems+=item.quantity)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <div id="ekart">
          <Toolbar style={{ display:'flex', justifyContent:'space-between'}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" component={Link} to="/" style={{textDecoration:'none', color:'rgb(255,255,255)', fontFamily:'montserrat'}}>eKart</Typography>
            <div id="login" style={{display:'flex', alignItems:'center'}}>
              {user ? (
                <>
                <div style={{padding: '8px 16px'}}>
                  <Badge badgeContent={numberOfCartItems} component={Link} to="/cart" color="secondary"><ShoppingCartIcon fontSize="large" style={{color:'#f5fcff'}} /></Badge>
                </div>
                <div style={{padding: '8px 4px'}}>
                <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                </div></>
              ) : (
                <Button component={Link} to="/auth" variant="contained" color="secondary">Sign In</Button>
              ) }
            </div>
          </Toolbar>
        </div>
      </AppBar>
      <Drawer
        className={classes.drawer}
        anchor="left"
        onBackdropClick={handleDrawerClose}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <Typography variant="h6" align="center">Shop by category</Typography>
        <List>
          {categories.map((obj) => (
            <ListItem button component={Link} to={`/${obj.link}`} key={obj.category} onClick={() => setOpen(!open)}>
              <ListItemText primary={obj.category} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Toolbar className={classes.Toolbar}>

    </Toolbar>
    </div>
  )
}

export default Navbar
