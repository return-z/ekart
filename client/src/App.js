import React, {useState} from 'react'
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { Container, Grid } from '@material-ui/core';
import Auth from './components/Auth/Auth';
import Cart from './components/Cart/Cart';

import MenApparel from './components/Webpages/MenApparel';
import WomenApparel from './components/Webpages/WomenApparel';
import Books from './components/Webpages/Books';
import Electronics from './components/Webpages/Electronics';
import Misc from './components/Webpages/Misc';
import Sports from './components/Webpages/Sports';
import ItemDetails from './components/Webpages/ItemDetails';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => {
  const [filterCategory, setFilterCategory] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar open={open} setOpen={setOpen} setFilterCategory={setFilterCategory}/>
        <Switch>
          <Route path="/" exact render={() => <Home filterCategory={filterCategory} open={open}/>} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/cart" exact render={() => <Cart open={open}/>} />
          <Route path="/men-apparel" exact render={() => <MenApparel open={open}/>} />
          <Route path="/women-apparel" exact render={() => <WomenApparel open={open}/>} />
          <Route path="/books" exact render={() => <Books open={open}/>} />
          <Route path="/electronics" exact render={() => <Electronics open={open}/>} />
          <Route path="/sports" exact render={() => <Sports open={open}/>} />
          <Route path="/misc" exact render={() => <Misc open={open}/>} />
          <Route path="/item/:id" exact render={() => <ItemDetails open={open}/>} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App;
