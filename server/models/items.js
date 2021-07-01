import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
  title: String,
  image: String,
  price : String,
  category : String,
})

const Item = mongoose.model('Item', itemSchema);

export default Item;