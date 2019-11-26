import React from "react";
import AppToolbar from "./components/appToolbar";
import ColorSetter from "./components/colorSetter";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PaletteList from "./components/paletas";
import ColorProvider from "./colorContext/colorProvider";

export default function App() {
  return (
    <div>
      <ColorProvider>
        <Grid container>
          <Grid item xs={12} style={{ height: "50px" }}>
            <AppToolbar />
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
          <Grid item xs={6}>
            <Paper
              style={{
                marginInline: "4px",
                height: "87vh",
                padding: "8px",
                backgroundColor: "#e0e0e0"
              }}
            >
              <ColorSetter />
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
              <PaletteList />
            </Paper>
          </Grid>
        </Grid>
      </ColorProvider>
    </div>
  );
}
