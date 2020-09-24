import React from "react";
import "hammerjs";
import DrawerRouterContainer from "./layout/DrawerContainer.js";

import Dashboard from "./Dashboard";
import DashboardGroup from "./Dashboard2";


import { HashRouter, Switch, Route } from 'react-router-dom';
import "./App.scss";

function App() {
  return (
    <React.Fragment>
    <HashRouter>
        <DrawerRouterContainer >
            <Switch>
                <Route exact={true} path="/" component={Dashboard} />
                <Route exact={true} path="/2" component={DashboardGroup} />
    
            </Switch>
        </DrawerRouterContainer >
    </HashRouter>
    </React.Fragment>
  );
}

export default App;
