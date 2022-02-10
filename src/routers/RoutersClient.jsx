import React from "react";

import { Route, Switch, Redirect } from "react-router";

import Cart from "../pages/client/Cart";
import Category from "../pages/client/Category";
import Home from "../pages/client/Home";
import Product from "../pages/client/Product";
import Profile from "../pages/client/Profile";
import Checkout from "../pages/client/Checkout";
import HistoryOrder from "../pages/client/HistoryOrder";
import MyFavorite from "../pages/client/MyFavorite";

const RoutersClient = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route exact path="/product/:slug" exact={true} component={Product} />
      <Route exact path="/category/:slug" exact={true} component={Category} />
      <Route exact path="/cart" exact={true} component={Cart} />

      <Route exact path="/checkout" exact={true} component={Checkout} />
      <Route
        exact
        path="/history-order"
        exact={true}
        component={HistoryOrder}
      />

      <Route exact path="/my-favorite" exact={true} component={MyFavorite} />

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
