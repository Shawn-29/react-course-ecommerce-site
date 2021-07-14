import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'

import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
  AuthWrapper
} from './pages';

const App = () => {
  return <AuthWrapper>
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/cart'>
          <Cart />
        </Route>
        <Route exact path='/products'>
          <Products />
        </Route>
        <Route exact path='/products/:id' children={<SingleProduct />}>
        </Route>
        {/* props will appear in the PrivateRoute's rest parameter */}
        <PrivateRoute exact path='/checkout' sillyVal={99}>
          <Checkout />
        </PrivateRoute>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>    
  </AuthWrapper>;
};

export default App
