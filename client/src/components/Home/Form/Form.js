import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Paper, TextField, Typography, Button, MenuItem } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles'
import { addItem } from '../../../actions/items'
import { categories } from '../../../constants/items';

const Form = () => {
  const [itemData, setItemData] = useState({ title : '', image : '', price : '', category : '' });
  const dispatch = useDispatch();
  const classes = useStyles();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(itemData)
    dispatch(addItem(itemData));
    setItemData({ title : '', image : '', price : '', category : '' });
  };

  return (
    <Paper className={classes.paper}>
      <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography>Add an Item</Typography>
        <TextField name="title" label="title" variant="outlined" fullWidth value={itemData.title} onChange={(e) => setItemData({ ...itemData, title : e.target.value })} />
        <TextField name="price" label="price" variant="outlined" fullWidth value={itemData.price} onChange={(e) => setItemData({ ...itemData, price : e.target.value })} />
        <TextField select id="category" label="category" value={itemData.category} className={classes.select} fullWidth onChange={(e) => setItemData({ ...itemData, category : e.target.value })}>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <FileBase type="image" multiple={false} onDone={({ base64 }) => setItemData({ ...itemData, image : base64 })} />
        <Button variant="contained" color="primary" className={classes.buttonSubmit} size="large" type="submit" fullWidth>Submit</Button>
      </form>
    </Paper>
  )
}

export default Form
