import React from'react'
import iconClose from './assets/icon-close.svg';
import './Popup.css'

const Popup = ({trigger, setTrigger, children, buttonClick}) => {
    return (trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button 
                    className="close-btn" 
                    onClick={buttonClick}
                >
                    <img 
                        src={iconClose}  
                        alt="closing-icon"
                        className = "closing-icon"
                        height = '15'
                        width = '15'
                    />
                </button>
                {children}
            </div>
        </div>
    ) : "";
}

export default Popup;