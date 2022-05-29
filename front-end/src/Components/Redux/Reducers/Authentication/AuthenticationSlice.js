import { createSlice } from "@reduxjs/toolkit";

const AuthenticationSlice = createSlice({
    name: "Authentication",
    initialState: {
        method: "none",

    },
    reducers: {
        signInWith(state,action) {
            // switch(action.payload) {
            //     case "Google":
            //         state.method = "Google"
            //         break;
            //     default:
            //         break;
            // }
            if (action.payload == "Google") {
                state.method = "Google";
            }
        }
    }
});

export const {signInWith} = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;

//Selectors
export const selectSignInMethod = state => state.Authentication.method;