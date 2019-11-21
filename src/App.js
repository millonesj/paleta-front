import React from "react";
import AppToolbar from "./components/appToolbar";

export default function ButtonAppBar() {
  return <div>{AppToolbar({ backgroundColor: "red" })}</div>;
}
