import React from "react";
import RoutersAdmin from "../../routers/RoutersAdmin";

import Navbar from "./Navbar";

const MasterLayout = () => {
  return (
    <div>
      <Navbar />
      <RoutersAdmin />
    </div>
  );
};

export default MasterLayout;
