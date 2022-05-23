import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './Components/HomePage';
import NavBar from './Components/NavBar';
import * as CSS from "./css.js";
import { createRoot } from "react-dom/client";


//import Material UI Stuff here


// React 18
// The origins of the whole react app is found in ./Public/index.html
// React is a supplement to HTML
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <div id="app" style={{...CSS.appStyle}}>
    <HomePage></HomePage>
  </div>
)

// Change this in the future for React 18
// <= React 17
// ReactDOM.render(
//   <div id="app" style={{...CSS.test2}}>
//     <NavBar></NavBar>
//   </div>, document.getElementById('root'),
// )



