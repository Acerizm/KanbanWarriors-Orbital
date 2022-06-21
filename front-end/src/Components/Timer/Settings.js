import React from 'react';
import iconSettings from './assets/settings-icon.svg'
import './Settings.css';

const Settings = ({buttonClick}) => {
  return (
    <div className="settings">
      <button 
        className='settings-button' 
        onClick={buttonClick}
        >
        <img src={iconSettings} alt="icon-settings" height= '20' />
      </button>
    </div>
  )
}

export default Settings;