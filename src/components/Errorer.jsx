import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Errorer = () => {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Alert variant="filled" severity="error">
        <AlertTitle>Error</AlertTitle>
        something went wrong — Please try again later
      </Alert>
      <Button
        style={{ marginTop: "20px" }}
        variant="contained"
        color="primary"
        component={Link}
        to="/"
      >
        Return to Home
      </Button>
    </div>
  );
};

export default Errorer;
