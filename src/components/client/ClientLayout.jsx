import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Category from "../../pages/client/Category";

import RoutersClient from "../../routers/RoutersClient";
import RoutersAdmin from "../../routers/RoutersAdmin";

import Header from "./Header";
import Footer from "./Footer";

import "../../scss/client/index-client.scss";

const ClientLayout = () => {
  return (
    <div className="container">
      <Header />
      <div className="main">
        <RoutersClient />
      </div>
      <Footer />
    </div>
  );
};

export default ClientLayout;
