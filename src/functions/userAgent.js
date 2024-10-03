export default function userAgent() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
         return "Android"
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS"
    } else if (/mobile/i.test(userAgent)) {
        return "Mobile"
    } else {
        return "Desktop"
    }
}