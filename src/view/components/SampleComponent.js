import React from "react";
import icon from "../../img/image.png";
import { hot } from "react-hot-loader";

class SampleComponent extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Hello Chrome!</h1>
        <img src={icon} />
      </div>
    );
  }
}

export default hot(module)(SampleComponent);
