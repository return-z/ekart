import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Items from '../Home/Items/Items';
import { Container, Grid, Typography, Chip } from '@material-ui/core';
import { fetchItems } from '../../actions/items'
import useStyles from '../Navbar/styles'
import clsx from 'clsx';

const WomenApparel = ({ open }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [sortType, setSortType] = useState('l2h');

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch])

  const filterCategory='Women Apparel';

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
          <Grid item xs={12} sm={12} style={{display:'flex', flexDirection:'column'}}>
            <Typography variant="h5" style={{fontFamily:'montserrat'}}>Sort By:</Typography>
            <Grid item xs={12} sm={12} style={{display:'flex', flexWrap:'wrap'}}>
              <Chip label="Price (lowest to highest)" style={{margin:'8px'}} onClick={() => setSortType('l2h')}></Chip>
              <Chip label="Price (highest to lowest)" style={{margin:'8px'}} onClick={() => setSortType('h2l')}></Chip>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Items filterCategory={filterCategory} sortType={sortType} />
          </Grid>
        </Grid>
      </Container>
    </main>
  )
}

export default WomenApparel;