import axios from 'axios'

export const getLyrics = async (song) => {
    const apiEndPoint = (songName) => `/api/lyrics?q=${songName}`
    const data = await axios.get(apiEndPoint(song), {
        mode: 'no-cors',
    })
    // console.log(data.data)
    return data.data
}
export default getLyrics