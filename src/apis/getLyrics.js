import axios from 'axios'

export const getLyrics = async (song) => {
    const apiEndPoint = (songName) => `/api/lyrics?q=${songName}`
    try {
        const data = await axios.get(apiEndPoint(song))
        return data.data
    } catch (error) {
        if (error.status == 404) {
            return "not found"
        }
    }
    // console.log(data.data)
}
export default getLyrics