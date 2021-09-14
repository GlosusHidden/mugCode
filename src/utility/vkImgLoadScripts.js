import {vkAlbumUrl} from "../constants";

export const initAlbumOnLoadScript = (token) => {
    const script = document.createElement('script');
    script.src = `${vkAlbumUrl(token)}&callback=albumOnLoad`;
    script.id = 'albumOnLoadScript';
    document.getElementsByTagName("head")[0].appendChild(script);
}

export const deleteAlbumOnLoadScript = () => {
    document.getElementById('albumOnLoadScript').remove()
}