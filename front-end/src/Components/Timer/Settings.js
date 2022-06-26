import React from 'react';

// REDUX
import { useDispatch } from 'react-redux';
import { toggleModesOpen } from '../Redux/Reducers/PomodoroTimer/PomodoroTimerSlice';

// styles
import './Settings.css';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

const Settings = () => {  
  const onSettingsButtonClicked = ()=> {
    dispatch(toggleModesOpen());
  }
  const dispatch = useDispatch();

  return (
    <div className="settings">
      <IconButton 
        className='settings-button' 
        onClick={onSettingsButtonClicked}
        >
          <SettingsIcon/>
      </IconButton>
    </div>
  )
}

export default Settings;