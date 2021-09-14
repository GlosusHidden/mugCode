import React from 'react'
import {createTheme, MuiThemeProvider} from "@material-ui/core/styles";
import {Box, CssBaseline} from "@material-ui/core";

import {App} from "./App";

const scheme = {
    palette: {
        type: 'light',
        primary: {
            main: '#121212',
            contrastText: '#FFFFFF'
        }
    },
    typography: {
        "fontFamily": `"Helvetica", "Roboto"`,
        "fontSize": 18,
        "fontWeight": 500,
    }
}

export const Main = () => {
    return (
        <MuiThemeProvider theme={createTheme(scheme)}>
            <CssBaseline />
            <Box style={{margin: '0 auto', height: '100vh'}} maxWidth={500}>
                <App/>
            </Box>
        </MuiThemeProvider>
    )
}