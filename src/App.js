import React from "react";

import muiTheme from "./theme";
import Calender from "./components/Calendar/Calender";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from "@material-ui/styles";

import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import config from "./config.json";

export const App = () => {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={muiTheme}>
        <SCThemeProvider theme={muiTheme}>
          <CssBaseline />
          <Router>
            <Switch>
              <Route path="/" render={() => <Calender config={config} />} />
            </Switch>
          </Router>
        </SCThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default App;
