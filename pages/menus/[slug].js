import DynamicBodyComponent from "../../components/MenuComponents/DynamicBodyComponent";
import React from "react";

const MenuContents = ({ query }) => {
  return (
    <>
      <DynamicBodyComponent slug={query.slug} />
    </>
  );
};

MenuContents.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

export default MenuContents;
