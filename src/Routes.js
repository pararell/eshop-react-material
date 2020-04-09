import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Layout from './layout/Layout';

import Dashboard from './pages/Dashboard/Dashboard';
import ProductList from './pages/ProductList/ProductList';
import Account from './pages/Account/Account';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import NotFound from './pages/NotFound/NotFound';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/products"
      />
      <RouteWithLayout
        component={Dashboard}
        exact
        layout={Layout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={ProductList}
        exact
        layout={Layout}
        path="/products"
      />
      <RouteWithLayout
        component={Product}
        exact
        layout={Layout}
        path="/product/:id"
      />
      <RouteWithLayout
        component={Cart}
        exact
        layout={Layout}
        path="/cart"
      />
      <RouteWithLayout
        component={Account}
        exact
        layout={Layout}
        path="/account"
      />
      <RouteWithLayout
        component={SignUp}
        exact
        layout={Layout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignIn}
        exact
        layout={Layout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFound}
        exact
        layout={Layout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

const RouteWithLayout = props => {
    const { layout: Layout, component: Component, ...rest } = props;

    return (
      <Route
        {...rest}
        render={matchProps => (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        )}
      />
    );
};


export default Routes;
