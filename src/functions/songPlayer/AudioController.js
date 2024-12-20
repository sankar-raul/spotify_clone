import MusicPlayer from "./play"
export let Vibe = null
export const player = (songList, update, client) => {
    if (songList && update && client) {
        if (!Vibe) {
            Vibe = new MusicPlayer(songList, update, client)
        } else {
            Vibe.songList = songList
            Vibe.update = update
            Vibe.client = client
        }
    }
    return Vibe
}
export const setSongList = (songList) => {
    if (songList && Vibe) Vibe.songList = songList
}
export default player