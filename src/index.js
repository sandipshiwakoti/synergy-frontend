import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AppProvider } from "./customHooks/context";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppProvider>
        <App />
      </AppProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
