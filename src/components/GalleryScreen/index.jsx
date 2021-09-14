import React, {useEffect, useState} from 'react'
import {Box, ImageList, ImageListItem} from "@material-ui/core";

import {initAlbumOnLoadScript, deleteAlbumOnLoadScript, setImgPlaceholder, getImgSrc} from "../../utility";
import {ImageViewer} from "./ImageViewer";
import {Header} from "./Header";

export const GalleryScreen = ({token, onExit, notification}) => {
    const [imgList, setImgList] = useState(null);
    const [selectedImgId, setSelectedImgId]  = useState(null);

    useEffect(() => {
        initAlbumOnLoadScript(token);
        window.addEventListener('albumOnLoad', albumOnLoadHandler);
        return () => window.removeEventListener('albumOnLoad', albumOnLoadHandler);
    }, []);

    const albumOnLoadHandler = (e) => {
        if (e.detail.error) {
            notification('Ошибка доступа');
            onExit();
            return;
        }
        const data = e.detail?.data?.items ?? [];
        setImgList(data.sort((a, b) => a.date - b.date));
        deleteAlbumOnLoadScript();
    }

    return (
        <Box paddingBottom={'72px'}>
            <Header
                middle={'Mobile Up Gallery'}
                right={<span onClick={onExit}>Выход</span>}
            />
            <ImageList style={{margin: 0}}>
                {imgList ? imgList.map((item, id) => (
                    <ImageListItem key={id} onClick={() => setSelectedImgId(id)}>
                        <img src={getImgSrc(item)} alt={'img'} onError={setImgPlaceholder}/>
                    </ImageListItem>
                )) : null}
            </ImageList>
            <ImageViewer
                imageId={selectedImgId}
                onClose={() => setSelectedImgId(null)}
                onImageChange={(id) => setSelectedImgId(id)}
                imageList={imgList}
                notification={notification}
            />
        </Box>
    )
}