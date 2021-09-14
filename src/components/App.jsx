import React, {useState} from 'react'
import {Box} from "@material-ui/core";

import {StartScreen} from "./StartScreen";
import {getHashFromUrl} from "../utility";
import {GalleryScreen} from "./GalleryScreen";
import {tokenStoreName} from "../constants";
import Snackbar from "@material-ui/core/Snackbar";

export const App = () => {
    const [token, setToken] = useState(localStorage.getItem(tokenStoreName));
    const [notification, setNotification] = useState(null);

    const setVkToken = () => {
        localStorage.setItem(tokenStoreName, urlHash?.access_token);
        setToken(urlHash?.access_token);
    }

    const unsetVkToken = () => {
        localStorage.removeItem(tokenStoreName)
        setToken(null);
    }

    const urlHash = getHashFromUrl();

    if (urlHash?.access_token) setVkToken();

    return (
        <Box height={'100%'}>
            {token
                ? <GalleryScreen token={token} onExit={unsetVkToken} notification={value => setNotification(value)}/>
                : <StartScreen/>
            }
            <Snackbar
                open={!!notification}
                autoHideDuration={1000}
                onClose={() => setNotification(null)}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                message={notification}
            />
        </Box>
    )
}