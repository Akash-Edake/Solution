import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "@features/layout";
export default function Root(props) {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
