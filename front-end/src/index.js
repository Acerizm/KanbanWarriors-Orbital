import React from 'react';

// importing other pages
import HomePage from './Components/HomePage';
import SignInPage from './Components/Auth/SignIn';
import * as CSS from "./css.js";
import { createRoot } from "react-dom/client";

//import redux stuff here
import { Provider } from 'react-redux';
import store from "./Components/Redux/Store/store.js";

// import React Routing components here
import { BrowserRouter, Routes, Route, Navigate,Outlet } from 'react-router-dom';

import { getAuth, onAuthStateChanged } from 'firebase/auth';



// React 18
// The origins of the whole react app is found in ./Public/index.html
// React is a supplement to HTML
const container = document.getElementById("root");
const root = createRoot(container);

const ProtectedRoute = ({children}) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("hello");
        console.log(children);
        return children;
    } else {
        console.log("yolo");
        return <Navigate to="/SignIn" replace />;
    }
  });
}


root.render(
  <div id="app" style={{...CSS.appStyle}}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute/>}>
              <Route path="/home" element={<HomePage/>}/>
          </Route>
          <Route path="/" element = {<SignInPage/>} />
          <Route path="/SignIn" element= {<SignInPage/>} />
          {/* <Route path="/home" element={<HomePage/>}/> */}
        </Routes>
      </BrowserRouter>
      {/* <HomePage></HomePage> */}
    </Provider>
  </div>
)




