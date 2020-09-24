import React from "react";
import "hammerjs";
import DrawerRouterContainer from "./layout/DrawerContainer.js";

import Dashboard from "./Dashboard";
import Dashboard2 from "./Dashboard2";


import { HashRouter, Switch, Route } from 'react-router-dom';


import "./App.scss";

function App() {
  return (
    <React.Fragment>
    <HashRouter>
        <DrawerRouterContainer >
            <Switch>
                <Route exact={true} path="/" component={Dashboard} />
                <Route exact={true} path="/groups" component={Dashboard2} />
            </Switch>
        </DrawerRouterContainer >
    </HashRouter>
    </React.Fragment>
  );
}

export default App;
