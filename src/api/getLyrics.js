import axios from 'axios'

export const getLyrics = async (song) => {
    const apiEndPoint = (songName) => `https://api.textyl.co/api/lyrics?q=${songName}`
    const data = await axios.get(apiEndPoint(song))
    // console.log(data.data)
    return data.data
}
export default getLyrics