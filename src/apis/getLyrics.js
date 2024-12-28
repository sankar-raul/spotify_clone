import axios from 'axios'

let controller = null
export const getLyrics = async (song) => {
    if (controller)
        controller.abort()
    controller = new AbortController()
    const apiEndPoint = (songName) => `/api/lyrics?q=${songName}`
    try {
        const data = await axios.get(apiEndPoint(song), {
            signal: controller.signal
        })
        return data.data
    } catch (error) {
        if (error.status == 404) {
            return "not found"
        } else if (error.message == "canceled") {
            return "loading"
        }
        // console.log(error)
    }
    // console.log(data.data)
}
export default getLyrics