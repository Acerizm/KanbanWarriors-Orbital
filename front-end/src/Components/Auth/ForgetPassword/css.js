import { createTheme } from "@mui/material"

export const forgetPasswordPageStyle = {
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

export const forgetPasswordSectionStyle = {
    //border: "2px solid black",
    gridColumn: "2/ 3",
    gridRow: "2 / 3",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
}

export const forgotPasswordHeading = {
    //border: "2px solid black",
    fontSize: "20px",
    fontFamily: "arial",
    height: "20px",
    textAlign: "center",
    marginBottom: "50px"

}

export const descriptionStyle = {
    //border: "2px solid black",
    fontSize: "15px",
    fontFamily: "arial",
    height: "40px",
    textAlign: "center",
    marginBottom: "60px"

}

export const errorTextStyle = {
    fontFamily: "arial",
    fontSize: "15px",
    color: "red",
    //marginRight: "180px",
    //marginTop: "50px",
    marginBottom: "10px"
}

export const inputStyle = {
    //border: "2px solid black",
    width: "60%",
}

export const loadingStyle = {
    width: "100%",
    gridColumn: "1 / 4",
    gridRow: "1 / 2"
}

export const resetButtonTheme = createTheme({
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
                    marginTop: "20px"
                }
            }
        }
    }
})