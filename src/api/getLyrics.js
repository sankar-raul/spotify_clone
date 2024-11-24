import axios from 'axios'

export const getLyrics = async (song) => {
    const apiEndPoint = (songName) => `/api/lyrics?q=${songName}`
    const data = await axios.get(apiEndPoint(song))
    return data.data
}
export default getLyrics