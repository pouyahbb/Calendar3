import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CalenderPage from "./Calender/calender";

export const Pages = () => (
  <Router>
    <Switch>
      <Route path="/" render={CalenderPage} />
    </Switch>
  </Router>
);
