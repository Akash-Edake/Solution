// Progress
// Author Name:Pratik Tiwari
// Date:05/05/2022
// Start of the component

import React from "react";
import PropTypes from "prop-types";

import { CircularProgress, LinearProgress } from "@mui/material";

type IprogressProps = {
  displayStyle: string;
};

export function LLProgress(props: IprogressProps) {
  return props.displayStyle == "circular" ? (
    <CircularProgress />
  ) : (
    <LinearProgress />
  );
}

LLProgress.propTypes = {
  displayStyle: PropTypes.oneOf(["circular", "linear"]).isRequired,
};

//  End of the component
