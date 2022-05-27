import { createSlice } from "@reduxjs/toolkit";

// ------------------------------- Reducers ------------------------------------------------------------------------------------------------------
const backgroundImageSlice = createSlice({
    // name of the action
    name: "backgroundImage",
    // the initial default state
    initialState: {
        isDrawerOn: false,
        // spaceSelected: false,
        // currentSpaceImageId: 1
        space: {
            isSpaceSelected: false,
            currentSpaceImageId: 1,
        },
        wildlife: {
            isWildlifeSelected: false,
            currentWildlifeImageId: 1
        },
        city: {
            isCitySelected: false,
            currentCityImageId: 1
        },
        beach: {
            isBeachSelected: false,
            currentBeachImageId: 1
        }
        random: {
            isRandomSelected: false,
            currentRandomImageId: 1
        }
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
        },
        changeSpaceImage(state) {
            // update the state to let redux know we are using space category currently
            // if the value is the same, the state will not be updated
            // currently the code can be improved
            state.space.isSpaceSelected = true;
            state.wildlife.isWildlifeSelected = false;
            state.city.isCitySelected = false;
            state.beach.isBeachSelected = false;
            state.random.isRandomSelected = false;
            // algo for changing the current image to a random image with min and max value
            var max = 5;
            var min = 1;
            if (state.space.currentSpaceImageId == 5) {
                state.space.currentSpaceImageId = 1;
            } else {
                state.space.currentSpaceImageId += 1;
            }
        },
        changeWildlifeImage(state) {
            state.space.isSpaceSelected = false;
            state.wildlife.isWildlifeSelected = true;
            state.city.isCitySelected = false;
            state.beach.isBeachSelected = false;
            state.random.isRandomSelected = false;
            var max = 5;
            var min = 1;
            if (state.wildlife.currentWildlifeImageId == 5) {
                state.wildlife.currentWildlifeImageId = 1;
            } else {
                state.wildlife.currentWildlifeImageId += 1;
            }
        },
        changeCityImage(state) {
            state.space.isSpaceSelected = false;
            state.wildlife.isWildlifeSelected = false;
            state.city.isCitySelected = true;
            state.beach.isBeachSelected = false;
            state.random.isRandomSelected = false;
            var max = 5;
            var min = 1;
            if (state.city.currentCityImageId == 5) {
                state.city.currentCityImageId = 1;
            } else {
                state.city.currentCityImageId += 1;
            }
        },
        changeBeachImage(state) {
            state.space.isSpaceSelected = false;
            state.wildlife.isWildlifeSelected = false;
            state.city.isCitySelected = false;
            state.beach.isBeachSelected = true;
            state.random.isRandomSelected = false;
            var max = 5;
            var min = 1;
            if (state.beach.currentBeachImageId == 5) {
                state.beach.currentBeachImageId = 1;
            } else {
                state.beach.currentBeachImageId += 1;
            }
        }
        changeRandomImage(state) {
            state.space.isSpaceSelected = false;
            state.wildlife.isWildlifeSelected = false;
            state.city.isCitySelected = false;
            state.beach.isBeachSelected = false;
            state.random.isRandomSelected = true;
            var max = 5;
            var min = 1;
            if (state.beach.currentRandomImageId == 5) {
                state.beach.currentRandomImageId = 1;
            } else {
                state.beach.currentRandomImageId += 1;
            }
        }
    }
})

// ------------------------------- Exporting Actions/Reducers ---------------------------------------------------------------------------

export const {toggleDrawerOn,toggleDrawerOff,changeSpaceImage,changeWildlifeImage,changeCityImage,changeBeachImage} = backgroundImageSlice.actions;

export default backgroundImageSlice.reducer;

// ----------------------------------- Selectors ---------------------------------------------------------------------------------------
// Selectors for accessing the state in the Redux Store
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

// for our drawer
export const selectDrawerState = state => state.backgroundImage.isDrawerOn;

// for if the category is selected
export const selectSpace = state => state.backgroundImage.space.isSpaceSelected;
export const selectWildlife = state => state.backgroundImage.wildlife.isWildlifeSelected;
export const selectCity = state => state.backgroundImage.city.isCitySelected;
export const selectBeach = state => state.backgroundImage.beach.isBeachSelected;
export const selectRandom = state => state.backgroundImage.beach.isRandomSelected;

//for the image id of respective categories
export const updatedSpaceImageId = state => state.backgroundImage.space.currentSpaceImageId;
export const updatedWildlifeImageId = state => state.backgroundImage.wildlife.currentWildlifeImageId;
export const updatedCityImageId = state => state.backgroundImage.city.currentCityImageId;
export const updatedBeachImageId = state => state.backgroundImage.beach.currentBeachImageId;


