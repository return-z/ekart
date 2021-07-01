import React, { useEffect } from 'react'
import {  useDispatch } from 'react-redux';
import Items from '../Home/Items/Items';
import { Container, Grid, Typography } from '@material-ui/core';
import { fetchItems } from '../../actions/items'
import useStyles from '../Navbar/styles'
import clsx from 'clsx';

const MenApparel = ({ open }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch])

  const filterCategory = 'Men Apparel'

  return (
    <main
    className={clsx(classes.content, {
      [classes.contentShift]: open,
    })}
    >
      <div className={classes.drawerHeader} />
      <Container>
        <Grid container justify="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" style={{fontFamily:'montserrat'}}>{`Recommended ${filterCategory.toLowerCase()} for you:`}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Items filterCategory={filterCategory} />
          </Grid>
        </Grid>
      </Container>
    </main>
  )
}

export default MenApparel;