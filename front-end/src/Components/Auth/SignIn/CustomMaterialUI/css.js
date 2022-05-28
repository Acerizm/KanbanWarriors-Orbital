import { createTheme } from '@mui/material/styles';

// -------------------------JSX Components Styling ------------------------------------------
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
    justifyItems: "end"
}

export const emailSectionStyle = {
    height: "100%",
    width: "430px",
    display: "flex",
    gridColumn: "1 / 1",
    gridRow: "1 / 2",
    flexDirection: "column",
    justifyContent: "center",
    marginRight: "30px"
}

export const passwordSectionStyle = {
    height: "100%",
    width: "430px",
    display: "flex",
    gridColumn: "1 / 1",
    gridRow: "2 / 3",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginRight: "30px"
}

export const TextInputHeadings = {
    //border: "2px solid black",
    height: "20px",
    width: "430px",
    marginBottom: "20px",
    fontFamily: "arial",
    fontSize: "15px"
}

export const LoginSectionContainerStyle = {
    gridColumn: "3 / 4",
    gridRow: "2 / 3",
    height: "60%",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "100%",
    gridTemplateRows: "25% 25% 25% 25%",
    //justifyItems: "center",
    alignItems: "center"
}

export const LoginButtonStyle = {
    border: "2px solid black",
    borderRadius: "5px",
    height: "80%",
    width: "380px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
    marginLeft: "30px"
}

export const IconStyle = {
    fontSize: "30px",
    marginLeft: "50px"
}

export const SsoLinkStyle = {
    fontFamily: "arial",
    fontSize: "20px",
    marginLeft: "30px"
}

//------------------------- Material UI Custom Styling --------------------------------------
export const EmailAddressTheme = createTheme({
    components: {
        MuiInput: {     
            styleOverrides: {
                root: {
                    width: "430px",
                    height: "45px",
                }
            }
        }
    }
});

export const PasswordTheme = createTheme({
    components: {
        MuiInput: {       
            styleOverrides: {
                root: {
                    width: "430px",
                    height: "45px",
                }
            }
        }
    }
});

export const LoginButtonTheme = createTheme({
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
                    width: "430px",
                    height: "45px",
                    marginTop: "20px"
                }
            }
        }
    }
})

export const DividerTheme = createTheme({
    components: {
        MuiDivider: {
            styleOverrides: {
                root: {
                    gridColumn: "2 / 3",
                    gridRow: "2 / 3 ",
                    height: "80%",
                    fontFamily: "arial"
                }
            }
        }
    }
})