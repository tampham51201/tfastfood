import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MasterLayout from "./components/admin/MasterLayout";
import ClientLayout from "./components/client/ClientLayout";
import Login from "./pages/client/Login";
import Register from "./pages/client/Register";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route
            path="/admin"
            render={(props) => <MasterLayout {...props} />}
          />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" render={(props) => <ClientLayout {...props} />} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
