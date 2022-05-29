import React from 'react';

// importing other pages
import HomePage from './Components/HomePage';
import SignInPage from './Components/Auth/SignIn';
import * as CSS from "./css.js";
import { createRoot } from "react-dom/client";

//import redux stuff here
import { Provider,useSelector } from 'react-redux';
import store from "./Components/Redux/Store/store.js";
import { selectSignInMethod } from './Components/Redux/Reducers/Authentication/AuthenticationSlice';

// import React Routing components here
import { BrowserRouter, Routes, Route, Navigate,Outlet } from 'react-router-dom';

// import Auth stuff here
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Components/Auth/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { GoogleSignIn } from './Components/Auth/Firebase';



// React 18
// The origins of the whole react app is found in ./Public/index.html
// React is a supplement to HTML
const container = document.getElementById("root");
const root = createRoot(container);

const ProtectedRoute = ({children}) => {
  //const [currentUser, setCurrentUser] = React.useState(null);
  const [user, loading, error] = useAuthState(auth);
  // console.log(auth);
  // console.log(user);
  if (loading) {
    console.log("ord");
  }
  if (user) {
    return children ? children : <Outlet />;
  }
  if (error || error == undefined) {
    //need to show error message
    console.log("error")
    return <Navigate to="/SignIn" replace="true" />
  }
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




