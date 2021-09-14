import React from 'react';
import {Dialog, Slide, IconButton, ImageListItem, ImageList, Box} from '@material-ui/core';

import {Header} from "./Header";
import {BackIcon, ShareIcon} from "../Icons";

import moment from "moment";
import {setImgPlaceholder, getImgSrc} from "../../utility";
import styles from "./index.module.css";
moment.locale('ru');

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ImageViewer = ({imageId, onClose, imageList, onImageChange, notification}) => {
    const {innerWidth: screenWidth} = window;
    const imageSize = Math.min.apply(null, [screenWidth, 500]);

    return (
        <Dialog
            fullScreen
            open={imageId !== null}
            onClose={onClose}
            TransitionComponent={Transition}
            style={{maxWidth: imageSize, margin: '0 auto'}}
        >
            {imageId !== null ? (
                <Box style={{position: 'relative', height: '100%'}}>
                    <Header
                        left={
                            <IconButton
                                color="primary"
                                size={'small'}
                                style={{margin: '0 8px'}}
                                component="span"
                                onClick={onClose}
                            >
                                <BackIcon/>
                            </IconButton>
                        }
                        middle={moment(imageList[imageId].date * 1000).format('D MMMM YYYY')}
                        right={
                            <IconButton
                                color="primary"
                                size={'small'}
                                style={{margin: '0 8px'}}
                                onClick={() => notification('Опция недоступна')}
                            >
                                <ShareIcon/>
                            </IconButton>
                        }
                    />
                    <ImageList cols={1} rowHeight={imageSize} style={{margin: '80px 0px 0px', maxWidth: imageSize}}>
                        <ImageListItem style={{padding: 0}}>
                            <img src={getImgSrc(imageList[imageId])} alt={'img'} onError={setImgPlaceholder}/>
                        </ImageListItem>
                    </ImageList>
                    <Box className={styles.miniImgListContainer}>
                        <ImageList rowHeight={56} cols={2.5} className={styles.miniImgList}>
                            {imageList ? imageList.map((item, id) => (
                                <ImageListItem key={id} onClick={() => onImageChange(id)} style={{width: 56}}>
                                    <img src={getImgSrc(imageList[id])} alt={'img'} onError={setImgPlaceholder}/>
                                </ImageListItem>
                            )) : null}
                        </ImageList>
                    </Box>
                </Box>
            ) : null}
        </Dialog>
    );
}