import React, { useState, lazy, Suspense } from "react";
import Header from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import Progress from "./components/Progress";

const LazyAuthApp = lazy(() => import("./components/AuthApp"));
const LazyMarketingApp = lazy(() => import("./components/MarketingApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <LazyAuthApp onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/" component={LazyMarketingApp} />
            </Switch>
          </Suspense>
          
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
}
export default App;