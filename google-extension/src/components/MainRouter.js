import React from "react";
import { Switch, Route } from "react-router-dom";

import Search from "./Search";
import StoredDictionary from "./StoredDictionary";
import Settings from "./Settings";

const MainRouter = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Search} />
      <Route path="/dictionary" component={StoredDictionary} />
      <Route path="/settings" component={Settings} />
    </Switch>
  </main>
);

export default MainRouter;
