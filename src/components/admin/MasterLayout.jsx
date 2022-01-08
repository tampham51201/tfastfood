import React from "react";
import RoutersAdmin from "../../routers/RoutersAdmin";

import Navbar from "./Navbar";
import SideBar from "./SideBar";

import "../../scss/admin/index-admin.scss";

const MasterLayout = () => {
  return (
    <div>
      <div className="master-layout">
        <SideBar />
        <Navbar />
        <div className="master-layout__content">
          <RoutersAdmin />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
