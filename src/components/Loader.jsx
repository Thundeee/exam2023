import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <div
      className=""
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10vh",
      }}
    >
      <CircularProgress disableShrink />
    </div>
  );
};

export default Loader;
