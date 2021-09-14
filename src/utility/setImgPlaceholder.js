export const setImgPlaceholder = (e) => {
    e.target.onerror = null;
    e.target.src=`${window.location.origin}/image-placeholder.png`;
}