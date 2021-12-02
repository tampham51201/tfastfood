import React from "react";
import { Route } from "react-router";
import ClientLayout from "./components/client/ClientLayout";

const PublicRoute = ({ ...rest }) => {
  return (
    <div>
      <Route {...rest} render={(props) => <ClientLayout {...props} />} />
    </div>
  );
};

export default PublicRoute;
