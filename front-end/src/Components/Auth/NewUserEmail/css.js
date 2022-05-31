import { createTheme } from "@mui/material"

export const NewUserEmailContainerStyle = {
    //border: "2px solid black",
    height: "100%",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "calc((100% - 500px) / 2) 500px calc((100% - 500px) / 2)",
    gridTemplateRows: "calc((100% - 500px) / 2) 500px calc((100% - 500px) / 2)",

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

export const newEmailContainerStyle = {
    //border: "2px solid black",
    height: "100%",
    width: "100%",
    gridRow: "2 /3 ",
    gridColumn: "2 / 3",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
    //justifyContent: "center",

}

export const headingForButtonsStyle = {
    fontFamily: "arial",                
    fontSize: "25px",
    marginBottom: "20px"
}

export const TermsAndConditionsStyle = {
    width: "60%",
    fontFamily: "arial",                
    fontSize: "15px",
    marginBottom: "20px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    //justifyContent: "center"
}

export const textFieldHeadingsStyle = {
    fontFamily: "arial",
    fontSize: "15px",
    alignSelf: "flex-start",
    marginLeft: "100px",
    marginTop: "50px",
    marginBottom: "10px"

}

export const inputStyle = {
    //border: "2px solid black",
    width: "60%",
}


export const continueButtonTheme = createTheme({
    palette: {
        minimalistic: {
            main: "#000000",
            contrastText: "#000000"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    width: "60%",
                    height: "45px",
                    marginTop: "10px"
                }
            }
        }
    }
})

