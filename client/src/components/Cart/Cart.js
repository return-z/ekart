import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems, decreaseQuantity, deleteCartItem, increaseQuantity } from '../../actions/cart';
import { Typography, Divider, Grid, Container, Button } from '@material-ui/core';
import useStyles from '../Navbar/styles'
import clsx from 'clsx';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

const Cart = ({ open }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes = useStyles();

  useEffect(() => {
    if(user.result){
      dispatch(fetchCartItems({ userId : user?.result?._id }))
    }
  }, [dispatch])

  const handleDecrease = (item) => {
    dispatch(decreaseQuantity({ userId : user?.result._id, itemId : item._id }));
  }

  const handleIncrease = (item) => {
    dispatch(increaseQuantity({ userId : user?.result._id, itemId : item._id }));
  }

  const handleDelete = (item) => {
    dispatch(deleteCartItem({ userId : user?.result._id, itemId : item._id }));
  }

  let totalPrice = 0;
  for (const item of cartItems) {
    totalPrice += (parseInt(item.price)*item.quantity);
  }


  return (
    <main
    className={clsx(classes.content, {
      [classes.contentShift]: open,
    })}
    >
    <div className={classes.drawerHeader} />
      <Container>
      <Grid container spacing={3}>
      <div id="cart-items" ><Typography variant="h6" style={{fontFamily:'montserrat', fontSize:"2.5em"}}>Items in your cart</Typography></div>
        {cartItems.length ? 
          cartItems.map((item) => (
            <Grid container>
              <Grid item xs={12} sm={7} md={7} style={{display:'flex', padding:'16px', width:'100%'}}>
                <div key="image" style={{display:'flex', alignItems:'center'}}><img src={item.image} alt={item.title} style={{height:'50px', width:'50px'}} /></div>
                <div key="text" style={{padding:'16px'}}>
                  <Typography variant="h5" style={{ fontFamily:'Montserrat' }}>{item.title}</Typography>
                  <Typography variant="h6" style={{fontFamily:'montserrat', fontWeight:"400"}}>{`$ ${item.price}`}</Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={5} md={5} style={{display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                  <Typography style={{padding: '16px', fontFamily:'montserrat'}}>Quantity :</Typography>
                  <Button variant="contained" disabled={item.quantity <= 1} className={classes.button} onClick={()=>handleDecrease(item)} ><RemoveOutlinedIcon fontSize="small" /></Button>
                  <Typography variant="h6" style={{padding: '16px'}}>{item.quantity}</Typography>
                  <Button variant="contained" className={classes.button} onClick={()=>handleIncrease(item)} ><AddOutlinedIcon fontSize="small" /></Button>
                  <div style={{padding:'16px'}}><Button variant="contained" className={classes.button} onClick={()=>handleDelete(item)}><DeleteOutlineOutlinedIcon fontSize="default" /></Button></div>
              </Grid>
              <Divider style={{width:'100%'}} />
            </Grid>
        )) : null}
        <div id="grand-total" style={{display:'flex', width:'100%', justifyContent:'flex-end'}}><Typography variant="h6" style={{fontFamily:'montserrat', fontSize:"2em"}}>{totalPrice ? `Grand Total : $ ${totalPrice}` : null}</Typography></div>
        </Grid>
      </Container>
    </main>
  )
}

export default Cart
