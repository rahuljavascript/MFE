import React, { useState, lazy, Suspense, useEffect } from "react";
import Header from "./components/Header";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import { createBrowserHistory } from "history";
import Progress from "./components/Progress";

const LazyAuthApp = lazy(() => import("./components/AuthApp"));
const LazyMarketingApp = lazy(() => import("./components/MarketingApp"));
const LazyDashboardApp = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <LazyAuthApp onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <LazyDashboardApp />
              </Route>
              <Route path="/" component={LazyMarketingApp} />
            </Switch>
          </Suspense>
          
        </div>
      </Router>
    </StylesProvider>
  );
}
export default App;