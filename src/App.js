import React from "react";
import "hammerjs";
import DrawerRouterContainer from "./layout/DrawerContainer.js";

import { Dashboard } from "./Dashboard";
import { Dashboard2 } from "./Dashboard";
import { Dashboard3 } from "./Dashboard";
import { Dashboard4 } from "./Dashboard";

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
                <Route exact={true} path="/capitalm" component={Dashboard3} />
                <Route exact={true} path="/assetm" component={Dashboard4} />
            </Switch>
        </DrawerRouterContainer >
    </HashRouter>
    </React.Fragment>
  );
}

export default App;
