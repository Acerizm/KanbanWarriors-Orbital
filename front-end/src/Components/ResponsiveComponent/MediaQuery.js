import { useMediaQuery } from "react-responsive";

// this whole file will be used to determine the target resolutions and devices for our app
// source -> https://www.npmjs.com/package/react-responsive

//children -> refers to any properties/components that will be passed to the main component
export const Desktop = ({ children }) => {
	const isDesktop = useMediaQuery({ minWidth: 961 });
	return isDesktop ? children : null;
};

export const Tablet = ({ children }) => {
	const isTablet = useMediaQuery({ /*minWidth: 768,*/ maxWidth: 960 });
	return isTablet ? children : null;
};
