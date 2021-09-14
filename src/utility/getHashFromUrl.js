export const getHashFromUrl = () => {
    const hash = window.location.hash.substring(1);
    window.location.hash = '';
    return hash.split('&').reduce((res, item) => {
        const parts = item.split('=');
        res[parts[0]] = parts[1];
        return res;
    }, {});
}