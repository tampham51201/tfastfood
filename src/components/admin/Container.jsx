import React from "react";

const Container = (props) => {
  return <div className="container-admin">{props.children}</div>;
};

export const ContainerTitle = (props) => {
  return (
    <div className="container-admin__title">
      <h3>{props.children}</h3>
    </div>
  );
};
export const ContainerHeader = (props) => {
  return <div className="container-admin__header">{props.children}</div>;
};
export const ContainerHeaderRight = (props) => {
  return <div className="container-admin__header__right">{props.children}</div>;
};
export const ContainerDescription = (props) => {
  return (
    <div className="container-admin__description">
      <p>{props.children}</p>
    </div>
  );
};
export const ContainerBody = (props) => {
  return <div className="container-admin__body">{props.children}</div>;
};

export default Container;
