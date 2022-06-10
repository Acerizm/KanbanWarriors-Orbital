import React from 'react';
import iconSettings from './assets/settings-icon.svg'

const Settings = () => {
  return (
    <div className="settings">
      <button className='settings-button' onClick={ () => console.log('click')}>
        <img src={iconSettings} alt="icon-settings" height= '20' />
      </button>
    </div>
  )
}

export default Settings;