import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, Container, Button, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import useStyles from '../Navbar/styles'
import clsx from 'clsx';
import { addToCart } from '../../actions/cart';

const ItemDetails = ( {open} ) => {
  const item = useLocation().state.item;
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (user.result) {
      dispatch(addToCart({ item : item , userId: user?.result?._id }));
    } else {
      alert('Sign-in to add items to cart');
    }
  }

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
      >
    <div className={classes.drawerHeader} />
      <Grid container spacing={3}>
        <Grid item xs={12} style={{display:"flex", flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
          <img src={item.image} alt='image' style={{height:'400px', width:'350px'}}/>
          <Grid style={{display:"flex", justifyContent:'center'}}>
            <Button variant="contained" color="Primary" style={{margin:'8px'}} onClick={handleAddToCart}>Add to Cart</Button>
            <Button variant="contained" color="Secondary" style={{margin:'8px'}} component={Link} to="/cart">Buy Now</Button>
          </Grid>
        </Grid>
        <Grid item key="title" xs ={12} style={{display:'flex', flexDirection:'column',justifyContent:'center', padding:'16px', alignItems:'center'}}>
          <Typography variant="h5" style={{fontFamily:'montserrat'}}>{item.title}</Typography>
          <Typography variant="h3" style={{fontFamily:'montserrat'}}>{`$ ${item.price}`}</Typography>
          <ul>
          <li><Typography variant="h7" style={{fontFamily:'montserrat'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography></li>
          <li><Typography variant="h7" style={{fontFamily:'montserrat'}}>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography></li>
          <li><Typography variant="h7" style={{fontFamily:'montserrat'}}>Ut enim ad minim veniam, quis nostrud exercitation ullamco</Typography></li>
          </ul>
        </Grid>
      </Grid>
    </main>
  )
}

export default ItemDetails
