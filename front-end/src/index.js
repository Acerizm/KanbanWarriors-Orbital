import React from "react";

// importing other pages
import HomePage from "./Components/HomePage";
import SignInPage from "./Components/Auth/SignIn";
import * as CSS from "./css.js";
import { createRoot } from "react-dom/client";

//import redux stuff here
import { Provider } from "react-redux";
import store from "./Components/Redux/Store/store.js";

// import React Routing components here
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	Outlet,
} from "react-router-dom";

// import Auth stuff here
import { auth } from "./Components/Auth/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { CreateNewUser } from "./Components/Auth/CreateNewUser";
import { NewUserEmail } from "./Components/Auth/NewUserEmail";
import { ForgetPasswordPage } from "./Components/Auth/ForgetPassword";
import { LoadingArea } from "./Components/LoadingArea";
import AfterSignOutPage from "./Components/Auth/AfterSignOut";
import ErrorPage from "./Components/Auth/ErrorPage";

// React 18
// The origins of the whole react app is found in ./Public/index.html
// React is a supplement to HTML
const container = document.getElementById("root");
const root = createRoot(container);

const ProtectedRoute = ({ children }) => {
	const [user, loading, error] = useAuthState(auth);
	if (loading) {
		// show loading screen in the future
	}
	if (user) {
		return children ? children : <Outlet />;
	} else if (error == undefined && user == null && loading == false) {
		//need to show error message
		return <Navigate to="/SignIn" replace="true" />;
	}
};

root.render(
	<div id="app" style={{ ...CSS.appStyle }}>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route element={<ProtectedRoute />}>
						{/* All protected routes are written here */}
						<Route path="/" element={<HomePage />} />
						<Route path="/home" element={<HomePage />} />
					</Route>
					{/* All non-protected routes are written here */}
					<Route path="/SignIn" element={<SignInPage />} />
					<Route path="/NewUser" element={<CreateNewUser />} />
					<Route path="/NewEmail" element={<NewUserEmail />} />
					<Route
						path="/ForgetPassword"
						element={<ForgetPasswordPage />}
					/>
					<Route path="/Goodbye" element={<AfterSignOutPage />} />
					{/* Route for when the user enters invalid URL // Do error page in the future */}
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</div>
);
