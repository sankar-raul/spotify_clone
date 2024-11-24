import { createContext, useContext } from "react"

export const LyricsContext = createContext()
export const useLyrics = () => useContext(LyricsContext)
export default useLyrics