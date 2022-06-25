import { createTheme } from "@mui/material/styles";

// -------------------------JSX Components Styling ------------------------------------------
export const SignInDesktopContainerStyle = {
	height: "100%",
	width: "100%",
	display: "grid",
	gridTemplateColumns:
		"calc((100vw - 100px) / 2) 100px calc((100vw - 100px) / 2)",
	gridTemplateRows: "calc((100% - 500px) / 2) 500px calc((100% - 500px) / 2)",
	alignItems: "center",
};

export const SignInTabletContainerStyle = {
	height: "100%",
	width: "100%",
	// display: "grid",
	// gridTemplateColumns: "100%",
	// gridTemplateRows: "100%",
	alignItems: "center",
};

export const EmailSectionContainerStyle = {
	//border: "2px solid black",
	height: "100%",
	width: "100%",
	gridColumn: "1 / 1",
	gridRow: "2 / 3",
	// this Section will become an inner grid
	display: "grid",
	gridTemplateColumns: "100%",
	gridTemplateRows: "33% 33% 33%",
	justifyItems: "end",
};

export const EmailSectionContainerTabletStyle = {
	//border: "2px solid black",
	height: "100%",
	width: "100%",
	// gridColumn: "1 / 1",
	// gridRow: "1 / 2",
	// this Section will become an inner grid
	// display: "grid",
	// gridTemplateColumns: "100%",
	// gridTemplateRows: "33% 33% 33%",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	//justifyItems: "center",
	alignItems: "center",
};

export const emailSectionStyle = {
	//border: "2px solid black",
	height: "100%",
	width: "430px",
	display: "flex",
	gridColumn: "1 / 1",
	gridRow: "1 / 2",
	flexDirection: "column",
	justifyContent: "center",
	marginRight: "30px",
};

export const emailSectionTabletStyle = {
	//border: "2px solid black",
	//height: "100%",
	width: "430px",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	marginBottom: "50px",
};

export const passwordSectionStyle = {
	height: "100%",
	width: "430px",
	display: "flex",
	gridColumn: "1 / 1",
	gridRow: "2 / 3",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	marginRight: "30px",
};

export const passwordSectionTabletStyle = {
	//border: "2px solid black",
	//height: "100%",
	width: "430px",
	display: "flex",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
};

export const TextInputHeadings = {
	//border: "2px solid black",
	height: "20px",
	width: "430px",
	marginBottom: "20px",
	fontFamily: "arial",
	fontSize: "15px",
};

// export const LoginSectionContainerStyle = {
// 	border: "2px solid black",
// 	gridColumn: "3 / 4",
// 	gridRow: "2 / 3",
// 	height: "60%",
// 	width: "100%",
// 	display: "grid",
// 	gridTemplateColumns: "100%",
// 	gridTemplateRows: "25% 25% 25% 25%",
// 	//justifyItems: "center",
// 	alignItems: "center",
// };

export const IconStyle = {
	fontSize: "30px",
	marginLeft: "50px",
};

export const SsoLinkStyle = {
	fontFamily: "arial",
	fontSize: "20px",
	marginLeft: "30px",
};

export const NewUserLinkStyle = {
	fontSize: "13px",
	fontFamily: "arial",
	gridRow: "3 / 4",
	gridColumn: "1 / 1",
	marginRight: "200px",
	marginTop: "100px",
	color: "black",
	height: "20px",
	//width: "50px"
};

export const NewUserLinkTabletStyle = {
	fontSize: "13px",
	fontFamily: "arial",
	marginTop: "50px",
	color: "black",
	height: "20px",
};

export const ForgetPasswordLinkStyle = {
	fontSize: "13px",
	fontFamily: "arial",
	gridRow: "3 / 4",
	gridColumn: "1 / 1",
	marginRight: "170px",
	marginTop: "150px",
	color: "black",
	height: "20px",
	//width: "50px"
};

export const ForgetPasswordLinkTabletStyle = {
	fontSize: "13px",
	fontFamily: "arial",
	marginTop: "50px",
	color: "black",
	height: "20px",
};

export const errorTextComponentStyle = {
	color: "red",
	fontFamily: "arial",
	gridColumn: "1 / 2",
	gridRow: "3 / 4",
};

export const SsoButtonsTabletStyle = {
	marginTop: "30px",
	height: "40px",
	width: "430px",
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-around",
};

//------------------------- Material UI Custom Styling --------------------------------------
// Do not use createTheme -> too complicated
// use "sx={{}}" prop by Material UI for material UI components

export const EmailAddressTheme = createTheme({
	components: {
		MuiInput: {
			styleOverrides: {
				root: {
					width: "430px",
					height: "45px",
				},
			},
		},
	},
});

export const PasswordTheme = createTheme({
	components: {
		MuiInput: {
			styleOverrides: {
				root: {
					width: "430px",
					height: "45px",
				},
			},
		},
	},
});

export const LoginButtonTheme = createTheme({
	palette: {
		minimalistic: {
			main: "#000000",
			contrastText: "#000000",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					width: "430px",
					height: "45px",
					marginTop: "20px",
					gridColumn: "1 / 1",
					gridRow: "3 / 4",
				},
			},
		},
	},
});

export const DividerTheme = createTheme({
	components: {
		MuiDivider: {
			styleOverrides: {
				root: {
					gridColumn: "2 / 3",
					gridRow: "2 / 3 ",
					height: "80%",
					fontFamily: "arial",
				},
			},
		},
	},
});

export const DividerTabletTheme = createTheme({
	components: {
		MuiDivider: {
			styleOverrides: {
				root: {
					width: "430px",
					marginTop: "30px",
					fontFamily: "arial",
					justifyContent: "center",
					alignItems: "center",
				},
				wrapper: {
					position: "relative",
					top: "50%",
				},
			},
		},
	},
});
