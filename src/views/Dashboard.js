import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React, { useState } from "react";
import AppToolbar from "../components/appToolbar";
import ColorSetter from "../components/colorSetter";
import PaletteList from "../components/paletas";
import ColorProvider from "../colorContext/colorProvider";

import Chat from "../components/Chat";
import Store from "../contexts/Store";
import SignIn from "../components/SignIn";
import ShareCard from "../components/shareCard";

const Dashboard = () => {
  const [name, setName] = useState("");
  return (
    <div>
      <ColorProvider>
        <Grid container>
          <Grid item xs={12} style={{ height: "50px" }}>
            <AppToolbar title={name} />
          </Grid>
          <Grid item xs={3}>
            <Paper
              style={{
                display: "flex",
                marginInline: "4px",
                height: "87vh",
                padding: "8px",
                backgroundColor: "#e0e0e0"
              }}
            >
              <Store>
                <Chat></Chat>
              </Store>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={12}>
                <Paper
                  style={{
                    marginInline: "4px",
                    height: "57vh",
                    padding: "8px",
                    backgroundColor: "#e0e0e0"
                  }}
                >
                  <ColorSetter />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  style={{
                    marginInline: "4px",
                    marginTop: "8px",
                    height: "27vh",
                    padding: "8px",
                    backgroundColor: "#e0e0e0"
                  }}
                >
                  <ShareCard setName={setName} />
                </Paper>
              </Grid>
            </Grid>
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
};
export default Dashboard;
