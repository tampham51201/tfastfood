import React from "react";

import { Route, Switch } from "react-router";

import Cart from "../pages/client/Cart";
import Category from "../pages/client/Category";
import Home from "../pages/client/Home";
import Product from "../pages/client/Product";

const RoutersClient = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/category/:slug" component={Product} />
      <Route path="/category" component={Category} />
      <Route path="/cart" component={Cart} />
    </Switch>
  );
};

export default RoutersClient;
