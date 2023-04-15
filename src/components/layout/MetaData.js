import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - Online Shop`}</title>
      {/* <meta name="description" content="Shopping Cart" /> */}
    </Helmet>
  );
};

export default MetaData;
