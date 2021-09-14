const vkAuth = {
    url: 'https://oauth.vk.com/authorize',
    appId: '7949374',
    responseType: 'token',
    scope: 'photos',
}

const vkAlbum = {
    url: 'https://api.vk.com/method/photos.get',
    url2: 'https://api.vk.com/method/photos.copy',
    albumId: '266276915',
    ownerId: '-128666765',
    apiVersion: '5.131',
}

const appUrl = 'http://localhost:4000';
const appUrl2 = 'https://glosushidden.github.io/mug';

export const tokenStoreName = 'vk_token';

export const vkAuthUrl = `${vkAuth.url}?client_id=${vkAuth.appId}&redirect_uri=${appUrl2}&response_type=${vkAuth.responseType}&scope=${vkAuth.scope}`;
export const vkAlbumUrl = (token) => `${vkAlbum.url}?album_id=${vkAlbum.albumId}&owner_id=${vkAlbum.ownerId}&v=${vkAlbum.apiVersion}&access_token=${token}`;

export const vkSaveImg = (token) => `${vkAlbum.url2}?photo_id=${'457239702'}&owner_id=${'-128666765'}&v=${vkAlbum.apiVersion}&access_token=${token}`;
