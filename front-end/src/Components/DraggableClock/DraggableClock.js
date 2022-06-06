import React, { useEffect, useState } from 'react';
import "./DraggableClock.css"

function DraggableClock() {
	const[clockState, setClockState] = useState();
	const [textColor, setTextColor] = useState('black');

	const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
	const handleChangeTextColor = (e) => {
		setTextColor(randomColor);
	}

	useEffect(() => {
		setInterval(() => {
			const date = new Date();
			setClockState(date.toLocaleTimeString())
		}, 1000);
	},[]);

	return (
		<React.Fragment>
			<div className='clock clockHandle' onClick={handleChangeTextColor} style={{color:textColor}}>
				{clockState}
			</div>
		</React.Fragment>
	);
}

export default DraggableClock;