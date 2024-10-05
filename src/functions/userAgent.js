export default function userAgent() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
         return "android"
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS"
    } else if (/mobile/i.test(userAgent)) {
        return "mobile"
    } else {
        return "desktop"
    }
}