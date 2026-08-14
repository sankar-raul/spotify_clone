import axios from 'axios'

let controller = null
export const getLyrics = async (songname, artist) => {
    if (controller)
        controller.abort()
    controller = new AbortController()
    const apiEndPoint = (songName) => `/api/lyrics/?artist=${artist}&song=${songName}&timestamps=true`
    try {
        const data = await axios.get(apiEndPoint(songname), {
            signal: controller.signal
        })
        return data.data
    } catch (error) {
        if (error.status == 404) {
            return "not found"
        } else if (error.message == "canceled") {
            return "loading"
        }
    }
}
export default getLyrics