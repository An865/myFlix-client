/* index.jsx is where we import and use the root component MainView */

import React from "react";
import ReactDOM from "react-dom";
/* import main-view component 
note: since src and index.jsx are at same level use ./ in path to main-view
*/
import MainView from "./components/main-view/main-view";
// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  //note MyFlixApplication is real root component
  render() {
    return <MainView />;
  }
}

// Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
