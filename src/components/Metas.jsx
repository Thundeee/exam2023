import React from "react";
import WifiIcon from "@mui/icons-material/Wifi";
import PetsIcon from "@mui/icons-material/Pets";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Tooltip, Fade } from "@mui/material/";

const Metas = ({ path }) => {
  return (
    <ul>
      <li>
        <Tooltip
          title="WiFi"
          placement="right-end"
          arrow
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
        >
          <WifiIcon />
        </Tooltip>
        {path.wifi ? (
          <CheckIcon style={{ color: "green" }} />
        ) : (
          <ClearIcon style={{ color: "red" }} />
        )}
      </li>
      <li>
        <Tooltip
          title="Parking"
          placement="right-end"
          arrow
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
        >
          <LocalParkingIcon />
        </Tooltip>
        {path.parking ? (
          <CheckIcon style={{ color: "green" }} />
        ) : (
          <ClearIcon style={{ color: "red" }} />
        )}
      </li>
      <li>
        <Tooltip
          title="Breakfast"
          placement="right-end"
          arrow
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
        >
          <FreeBreakfastIcon />
        </Tooltip>
        {path.breakfast ? (
          <CheckIcon style={{ color: "green" }} />
        ) : (
          <ClearIcon style={{ color: "red" }} />
        )}
      </li>
      <li>
        <Tooltip
          title="Pets"
          placement="right-end"
          arrow
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
        >
          <PetsIcon />
        </Tooltip>
        {path.pets ? (
          <CheckIcon style={{ color: "green" }} />
        ) : (
          <ClearIcon style={{ color: "red" }} />
        )}
      </li>
    </ul>
  );
};

export default Metas;
