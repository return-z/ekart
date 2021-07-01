import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardMedia, CardContent, Typography, CardActionArea, CardActions, Button } from '@material-ui/core';
import useStyles from './styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { addToCart } from '../../../../actions/cart';
import { Link } from 'react-router-dom';

const Item = ( { item }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const handleAddToCart = () => {
    if (user.result) {
      dispatch(addToCart({ item : item , userId: user?.result?._id }));
    } else {
      alert('Sign-in to add items to cart');
    }
  }
  

  return (
    <Card className={classes.card}>
      <CardActionArea style={{ textAlign : 'center' }} component={Link} to={{ pathname:`item/${item._id}`, state : {item}, } } >
        <CardMedia className={classes.media} image={item.image} title={item.title} />
        <CardContent style={{ padding : 5}}>
          <Typography variant="h5" className={classes.font}>{item.title}</Typography>
          <Typography variant="h6" component="h2" color="textPrimary" className={classes.font}>${item.price}</Typography>
          <Typography variant="body2" component="p" color="textSecondary" className={classes.font}>{item.category}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent :'center', padding: 5, }}>
        {<Button onClick={handleAddToCart}>
          <AddShoppingCartIcon fontSize="small" />
          &nbsp;Add to cart
        </Button>}
      </CardActions>
    </Card>
  )
}

export default Item;
