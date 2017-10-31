import React, { Component } from "react";
import store from "./setupStore";
import Raven from "raven-js";
import { Provider } from "react-redux";
import FileHandlerContainer from "./components/FileHandlerContainer";
import logo from "./logo.svg";
import "../node_modules/carbon-components/css/carbon-components.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    document.title = "Tag Validator";
    // Log the initial state of the store
    console.log(store.getState());
    // Every time the state changes, log it. Note that subscribe() returns a function
    // for unregistering the listener, called in componentWillUnmount
    this.unsubscribe = store.subscribe(() => console.log(store.getState()));
    window.App = this;
  }

  componentWillUnmount() {
    this.unsubscribe();
    console.log("unsubscribed from store");
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Raven.captureException(error, { extra: errorInfo });
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Validate Tags</h1>
          </header>
          <div className="FileHandlerContainer">
            <FileHandlerContainer />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
