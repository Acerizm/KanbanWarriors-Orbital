import { createSlice } from "@reduxjs/toolkit";

// ------------------------------- Reducers ------------------------------------------------------------------------------------------------------
const pomodoroTimerSlice = createSlice({
    name: "pomodoroTimer",
    initialState: {
        isTimerDisplayed:false,
        // Draggable Timer
        pomodoroTime: 25,
        breakTime: 5, 
        ModesOpen: true,
        // CountDown Clock
        displayMessage: false,
        paused: false,
    },
    reducers : {
        toggleTimer(state) {
			state.isTimerDisplayed = !state.isTimerDisplayed;
		},
        changePomodoroTime(state,action) {
            state.pomodoroTime = action.payload.pomodoroTime;
        },

        changeBreakTime(state, action) {
            state.breakTime = action.payload.breakTime;
        },

        toggleModesOpen(state) {
            state.ModesOpen = !state.ModesOpen;
        },
        
    }

})

// Exporting Reducers/Actions
export const { changePomodoroTime, changeBreakTime, toggleModesOpen, toggleTimer} = pomodoroTimerSlice.actions;

export default pomodoroTimerSlice.reducer;

// Selectors
export const getTimerState = (state) => state.pomodoroTimer.isTimerDisplayed;

export const getPomodoroTime = (state) => state.pomodoroTimer.pomodoroTime;
export const getBreakTime = (state) => state.pomodoroTimer.breakTime;
export const getModesOpen = (state) => state.pomodoroTimer.ModesOpen;
