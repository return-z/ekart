import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import itemRoutes from './routes/items.js';
import userRoutes from './routes/users.js';

const app = express();

app.use(bodyParser.json({ limit : "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit : "30mb", extended: true }));
app.use(cors());

app.use('/items', itemRoutes)
app.use('/user', userRoutes);

const CONNECTION_URL = 'mongodb+srv://yveskobi:yveskobi123@cluster0.2in7u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log('connected')))
  .catch((error) => console.log(error))

mongoose.set('useFindAndModify', false);

