import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Login from "./pages/client/Login";
import ForgotPassword from "./pages/client/ForgotPassword";
import ResetPassword from "./pages/client/ResetPassword";

import Register from "./pages/client/Register";
import AdminPrivateRoute from "./AdminPrivateRoute";
import PublicRoute from "./PublicRoute";

import Page403 from "./pages/Page403";
import Page404 from "./pages/Page404";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <AdminPrivateRoute path="/admin" />
          <Route path="/login">
            {localStorage.getItem("auth_token") ? (
              <Redirect to="/" />
            ) : (
              <Login />
            )}
          </Route>

          <Route
            path="/reset-password/:emailUser/:token"
            component={ResetPassword}
          />

          <Route path="/register">
            {localStorage.getItem("auth_token") ? (
              <Redirect to="/" />
            ) : (
              <Register />
            )}
          </Route>

          <Route path="/forgot-password">
            {localStorage.getItem("auth_token") ? (
              <Redirect to="/" />
            ) : (
              <ForgotPassword />
            )}
          </Route>

          <Route path="/page403" component={Page403} />
          <Route path="/page404" component={Page404} />

          <PublicRoute path="/" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
