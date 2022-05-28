import { createSlice } from "@reduxjs/toolkit";

const AuthenticationSlice = createSlice({
    name: "Authentication",
    initialState: {
        user: null
    },
    reducers: {
        saveUserAuthentication(state,action) {
            state.user = action.payload;
        }
    }
});

export const {saveUserAuthentication} = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;

//Selectors
export const selectUserAuth = state => state.AuthenticationSlice.user;