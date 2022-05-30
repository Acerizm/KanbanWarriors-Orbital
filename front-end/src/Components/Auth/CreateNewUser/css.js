export const createNewUserContainerStyle = {
    //border: "2px solid black",
    height: "100%",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "calc((100% - 500px) / 2) 500px calc((100% - 500px) / 2)",
    gridTemplateRows: "calc((100% - 500px) / 2) 500px calc((100% - 500px) / 2)",
    //justifyItems: "center",
    //alignContent: "start",
    //justifyContent: "start",
}

export const BackNavigationStyle = {
    //border: "2px solid black",
    gridColumn: "1 / 2 ",
    gridRow: "1 / 2",
    height: "30px",
    width: "30px",
    marginTop: "30px",
    marginLeft: "30px",
    color: "black"
}
export const LoginNavigationStyle = {
    //border: "2px solid black",
    gridColumn: "3 / 4 ",
    gridRow: "1 / 2",
    height: "30px",
    width: "30px",
    justifySelf: "end",
    marginTop: "30px",
    marginRight: "30px",
    color: "black"
}

export const headingForButtonsStyle = {
    fontFamily: "arial",                
    fontSize: "25px",
    marginBottom: "20px"
}

export const TermsAndConditionsStyle = {
    fontFamily: "arial",                
    fontSize: "15px",
    marginBottom: "20px"
}