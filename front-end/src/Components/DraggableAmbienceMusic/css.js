export const AmbienceMusicContainerStyle = {
	//border: "2px solid red",
	height: "450px",
	width: "350px",
	borderRadius: "10px",
	gridRow: "1",
	gridColumn: "1",
	display: "grid",
	gridTemplateColumn: "100%",
	gridTemplateRows:
		"10% calc((100% - 10%) / 6) calc((100% - 10%) / 6) calc((100% - 10%) / 6) calc((100% - 10%) / 6) calc((100% - 10%) / 6) calc((100% - 10%) / 6)",
	backgroundColor: "#FFFFFF",
};

export const AmbienceMusicHeadingStyle = {
	//border: "2px solid green",
	//borderBottom: "1px solid back",
	height: "100%",
	width: "100%",
	gridColumn: "1 / 1",
	gridRow: "1 / 2",
	display: "flex",
	flexDirection: "row",
	//alignItems: "center",
};

export const AmbienceMusicTitleStyle = {
	fontFamily: "arial",
	fontSize: "15px",
	height: "100%",
	width: "50%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	//border: "2px solid black",
};

export const minimizeStyle = {
	marginLeft: "300px",
	//border: "2px solid black",
	width: "50px",
	height: "40px",
	cursor: "pointer"
}

export const AmbienceSoundStyle = {
	height: "100%",
	widht: "100%",
	gridColumn: "1 / 1",
	//border: "2px solid green",
};

export const AmbienceSoundTitleStyle = {
	height: "30%",
	width: "20%",
	fontFamily: "arial",
	fontSize: "18px",
	//border: "2px solid red",
	marginLeft: "20px",
};

export const AmbienceSoundPlayerStyle = {
	height: "50%",
	width: "90%",
	//border: "2px solid green",
	marginLeft: "20px",
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
};
