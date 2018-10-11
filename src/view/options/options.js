import "./options.scss";

import React from "react";
import { render } from "react-dom";
import SampleComponent from "../components/SampleComponent";

class RunnerApp extends React.Component {
  render() {
    return (
      <div>
        <SampleComponent />
      </div>
    );
  }
}

render(<RunnerApp />, window.document.getElementById("app-container"));
