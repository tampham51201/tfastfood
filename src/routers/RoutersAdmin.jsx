import React from "react";

import { Route, Switch } from "react-router";

import Dashboard from "../pages/admin/Dashboard";
import Profile from "../pages/admin/Profile";

const RoutersAdmin = () => {
  return (
    <Switch>
      <Route exact path="/admin" component={Dashboard} />
      <Route path="/admin/profile" component={Profile} />
    </Switch>
  );
};

export default RoutersAdmin;
