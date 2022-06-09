import React, { useState, Fragment } from "react";
import * as CSS from "./css.js";
import { useSelector } from "react-redux";
import * as REDUX from "../Redux/Reducers/BackgroundImage/BackgroundImageSlice.js";
import {
	SelfBuildingSquareSpinner,
	BreedingRhombusSpinner,
	CirclesToRhombusesSpinner,
	FingerprintSpinner,
	FlowerSpinner,
	FulfillingBouncingCircleSpinner,
	FulfillingSquareSpinner,
	HalfCircleSpinner,
	HollowDotsSpinner,
	IntersectingCirclesSpinner,
	LoopingRhombusesSpinner,
	PixelSpinner,
	RadarSpinner,
	ScalingSquaresSpinner,
	SemipolarSpinner,
	SpringSpinner,
	SwappingSquaresSpinner,
} from "react-epic-spinners";

const rng = () => {
	return Math.floor(Math.random() * 18) + 1;
};

export const LoadingArea = () => {
	const showLoadingArea = useSelector(REDUX.selectLoadingArea);
	//const showLoadingArea = true;
	let spinner;
	let rngValue = rng();
	if (rngValue == 1) {
		spinner = (
			<SelfBuildingSquareSpinner
				size={100}
				style={{ ...CSS.spinnerStyle }}
				color="#4c68d7"
			/>
		);
	} else if (rngValue == 2) {
		spinner = (
			<BreedingRhombusSpinner
				size={100}
				style={{ ...CSS.spinnerStyle }}
				color="#4c68d7"
			/>
		);
	} else if (rngValue == 3) {
		spinner = (
			<CirclesToRhombusesSpinner
				size={50}
				style={{ ...CSS.spinnerStyle }}
				color="#4c68d7"
			/>
		);
	} else if (rngValue == 4) {
		spinner = (
			<FingerprintSpinner
				size={100}
				style={{ ...CSS.spinnerStyle }}
				color="#4c68d7"
			/>
		);
	} else if (rngValue == 5) {
		spinner = (
			<FlowerSpinner
				size={100}
				style={{ ...CSS.spinnerStyle }}
				color="#4c68d7"
			/>
		);
	} else if (rngValue == 6) {
		spinner = (
			<FulfillingBouncingCircleSpinner
				size={100}
				style={{ ...CSS.spinnerStyle }}
				color="#4c68d7"
			/>
		);
	} else if (rngValue == 7) {
		spinner = (
			<FulfillingSquareSpinner
				size={50}
				style={{ ...CSS.spinnerStyle }}
				color="#4c68d7"
			/>
		);
	} else if (rngValue == 8) {
		spinner = (
			<HalfCircleSpinner
				size={100}
				style={{ ...CSS.spinnerStyle }}
				color="#4c68d7"
			/>
		);
	} else if (rngValue == 9) {
		spinner = (
			<HollowDotsSpinner
				size={50}
				style={{ ...CSS.spinnerStyle }}
				color="#4c68d7"
			/>
		);
	} else if (rngValue == 10) {
		spinner = (
			<IntersectingCirclesSpinner
				size={100}
				style={{ ...CSS.spinnerStyle }}
				color="#4c68d7"
			/>
		);
	} else if (rngValue == 11) {
		spinner = (
			<LoopingRhombusesSpinner
				size={50}
				style={{ ...CSS.spinnerStyle }}
				color="#4c68d7"
			/>
		);
	} else if (rngValue == 12) {
		spinner = (
			<LoopingRhombusesSpinner
				size={50}
				style={{ ...CSS.spinnerStyle }}
				color="#4c68d7"
			/>
		);
	} else if (rngValue == 13) {
		spinner = (
			<PixelSpinner
				size={100}
				style={{ ...CSS.spinnerStyle }}
				color="#4c68d7"
			/>
		);
	} else if (rngValue == 14) {
		spinner = (
			<RadarSpinner
				size={100}
				style={{ ...CSS.spinnerStyle }}
				color="#4c68d7"
			/>
		);
	} else if (rngValue == 15) {
		spinner = (
			<ScalingSquaresSpinner
				size={100}
				style={{ ...CSS.spinnerStyle }}
				color="#4c68d7"
			/>
		);
	} else if (rngValue == 16) {
		spinner = (
			<SemipolarSpinner
				size={100}
				style={{ ...CSS.spinnerStyle }}
				color="#4c68d7"
			/>
		);
	} else if (rngValue == 17) {
		spinner = (
			<SpringSpinner
				size={100}
				style={{ ...CSS.spinnerStyle }}
				color="#4c68d7"
			/>
		);
	} else if (rngValue == 18) {
		spinner = (
			<SwappingSquaresSpinner
				size={100}
				style={{ ...CSS.spinnerStyle }}
				color="#4c68d7"
			/>
		);
	}
	return (
		<Fragment>
			{showLoadingArea ? (
				<div id="LoadingArea" style={{ ...CSS.loadingAreaStyle }}>
					<div style={{ ...CSS.LoadingTitle }}>Loading...</div>
					{spinner}
				</div>
			) : null}
		</Fragment>
	);
};
