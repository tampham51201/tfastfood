import React from "react";

import { Route, Switch, Redirect } from "react-router";

import Cart from "../pages/client/Cart";
import Category from "../pages/client/Category";
import Home from "../pages/client/Home";
import Product from "../pages/client/Product";
import Profile from "../pages/client/Profile";

const RoutersClient = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route exact path="/category/:slug" exact={true} component={Product} />
      <Route exact path="/category" exact={true} component={Category} />
      <Route exact path="/cart" exact={true} component={Cart} />

      <Route exact path="/profile">
        {!localStorage.getItem("auth_token") ? (
          <Redirect to="/login" />
        ) : (
          <Profile />
        )}
      </Route>
    </Switch>
  );
};

export default RoutersClient;
