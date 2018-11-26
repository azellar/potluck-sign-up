import React, { Component } from "react";

import "./App.scss";
import AppProvider, { AppContext } from "../providers/AppProvider";
import Event from './Event/Event';
import Login from './Login/Login';

import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {

  render() {
    return (
      <AppProvider>
        <AppContext.Consumer>
          {appContext => (
            <>
              <CssBaseline />
              {
                appContext.state.user.loggedIn
                  ? <Event appContext={appContext} />
                  : <Login appContext={appContext} />
              }
            </>
          )}
        </AppContext.Consumer>
      </AppProvider>
    );
  }
}

export default App;
