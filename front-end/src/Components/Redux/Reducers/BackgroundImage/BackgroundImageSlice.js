import { createSlice } from "@reduxjs/toolkit";

const backgroundImageSlice = createSlice({
    // name of the action
    name: "backgroundImage",
    // the initial default state
    initialState: {
        isDrawerOn: false
    },
    // root reducer
    reducers: {
        // all the different reducers
        // that is relevant to backgroundImageSlice
        // redux tool kit automatically maps for us the actions using "<name>/<reducer>" like { type: "backgroundImage/toggleDrawerOn" }
        // so the reducer functions have the same name as our actions!

        toggleDrawerOn(state) {
            // this was how redux was used in the past without Redux toolkit slices
            // return {
            //     /// ... -> 3 dots refers to copying the original state/variable
            //     // then modify the copied var/state and return a new modified state
            //     // the original state is not modified a.k.a remains immutable
            //     ...state,
            //     // whatever state you want to modify here
            //     // key : value
            //     isDrawerOn: true
            // }
            
            // this is the new version
            // where an inbuilt framework caller ImmerJS settles the immutability problem for you
            state.isDrawerOn = true;
        },
        toggleDrawerOff(state) {
            state.isDrawerOn = false;
        }

    }
})

export const {toggleDrawerOn,toggleDrawerOff} = backgroundImageSlice.actions;

export default backgroundImageSlice.reducer;

// Selectors for accessing the state in the Redux Store
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectDrawerState = state => state.backgroundImage.isDrawerOn;