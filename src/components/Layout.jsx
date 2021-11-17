import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Routers from "../routers/Routers";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <Router>
      <Route
        render={() => (
          <div className="container">
            <Header />
            <div className="main">
              <Routers />
            </div>
            <Footer />
          </div>
        )}
      />
    </Router>
  );
};

export default Layout;
