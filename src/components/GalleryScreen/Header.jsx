import React from 'react'
import {Box, Paper} from "@material-ui/core";

import styles from './Header.module.css';


export const Header = ({left, middle, right}) => {
    return (
        <Paper square variant="outlined" className={styles.header}>
            <Box className={styles.headerLeft}>
                {left}
            </Box>
            <Box className={styles.headerMiddle}>
                {middle}
            </Box>
            <Box className={styles.headerRight}>
                {right}
            </Box>
        </Paper>
    )
}