import React from "react";

import RoutersClient from "../../routers/RoutersClient";

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
