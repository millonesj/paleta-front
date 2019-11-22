import React, { useState } from "react";
import AppToolbar from "./components/appToolbar";
import ColorSetter from "./components/colorSetter";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export default function App() {
  const [toolbarColors, setToolbarColors] = useState({
    backgroundColor: "green",
    titleColor: "blue",
    menuColor: "black"
  });
  return (
    <div>
      <Grid container>
        <Grid item xs={12} style={{ height: "50px" }}>
          {AppToolbar(toolbarColors)}
        </Grid>
        <Grid item xs={3}>
          <Paper
            style={{
              marginInline: "4px",
              height: "87vh",
              padding: "8px",
              backgroundColor: "#e0e0e0"
            }}
          >
            <h3 style={{ textAlign: "center" }}>Paletas</h3>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            style={{
              marginInline: "4px",
              height: "87vh",
              padding: "8px",
              backgroundColor: "#e0e0e0"
            }}
          >
            {ColorSetter({ setToolbarColors })}
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            style={{
              marginInline: "4px",
              height: "87vh",
              padding: "8px",
              backgroundColor: "#e0e0e0"
            }}
          >
            <h3 style={{ textAlign: "center" }}>Conversaciones</h3>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
