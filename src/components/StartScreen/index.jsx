import React from 'react'
import {Box, Button} from "@material-ui/core";

import styles from './index.module.css';
import {vkAuthUrl} from "../../constants";

export const StartScreen = () => {
    return (
        <Box className={styles.screen}>
            <Box className={styles.titleContainer} paddingX={3}>
                <span color={'primary'} className={styles.title}>
                    Mobile Up Gallery
                </span>
            </Box>
            <Box className={styles.loginButtonContainer} paddingX={3}>
                <Button
                    variant="contained"
                    color="primary"
                    component={'a'}
                    href={vkAuthUrl}
                    className={styles.loginButton}
                    size={'large'}
                    fullWidth
                >
                    Вход через VK
                </Button>
            </Box>
        </Box>
    )
}