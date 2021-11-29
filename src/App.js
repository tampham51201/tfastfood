import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import ClientLayout from "./components/client/ClientLayout";
import Login from "./pages/client/Login";
import Register from "./pages/client/Register";
import AdminPrivateRoute from "./AdminPrivateRoute";

import Page403 from "./pages/Page403";
import Page404 from "./pages/Page404";

// axios.defaults.baseURL = "http://localhost:8000/";
// axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.headers.post["Accept"] = "application/json";

// axios.defaults.withCredentials = true;
// axios.interceptors.request.use(function (config) {
//   const token = localStorage.getItem("auth_token");
//   config.headers.Authorization = token ? `Bearer ${token}` : "";
//   return config;
// });

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => <ClientLayout {...props} />}
          />
          <Route path="/page403" component={Page403} />
          <Route path="/page404" component={Page404} />
          <Route path="/login">
            {localStorage.getItem("auth_token") ? (
              <Redirect to="/" />
            ) : (
              <Login />
            )}
          </Route>
          <Route path="/register">
            {localStorage.getItem("auth_token") ? (
              <Redirect to="/" />
            ) : (
              <Register />
            )}
          </Route>
          <AdminPrivateRoute path="/admin" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
