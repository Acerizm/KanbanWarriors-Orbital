import React from'react'

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getModesOpen, toggleModesOpen } from '../Redux/Reducers/PomodoroTimer/PomodoroTimerSlice';

// styles
import './Popup.css'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Popup = ({children}) => {
    const dispatch = useDispatch();
    const ModesOpen = useSelector(getModesOpen)


    const onCloseButtonClicked = () => {
        dispatch(toggleModesOpen());
    }

    return (ModesOpen) ? (
        <div className="popup">
            <IconButton 
                className="close-btn" 
                onClick={onCloseButtonClicked}
            >
                <CloseIcon/>
            </IconButton>
            {children}
        </div>
        
    ) : "";
}

export default Popup;