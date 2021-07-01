import React from 'react'
import { useSelector } from 'react-redux'
import Item from './Item/Item';
import { Grid, Typography } from '@material-ui/core';
import modcheck from '../../../Icons/sadge.png';

const Items = ({ filterCategory, sortType }) => {
  let items = useSelector((state) => state.items);
  if (filterCategory && filterCategory !== 'All')
    items = items.filter((item) => item.category === filterCategory)

  if (sortType === 'l2h'){
    items.sort((a,b) => parseInt(a.price) > parseInt(b.price) ? 1 : -1);
  } else if ( sortType === 'h2l'){
    items.sort((a,b) => parseInt(a.price) > parseInt(b.price) ? -1 : 1);
  }
  
  return (
    !items.length ? (
      <div id="sadge" style={{ display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
        <img src={modcheck} style={{ padding : '16px'}} alt="no such products"/>
        <Typography variant="h4" style={{ padding : '8px'}}>Can't find anything like this...</Typography>
      </div>
      ) : (
      <Grid container alignItems="stretch" spacing={3} >
        {items.map((item) => (
          <Grid key={item._id} item xs={12} sm={3} md={3}>
            <Item item={item}/>
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Items;