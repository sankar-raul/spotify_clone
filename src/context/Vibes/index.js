import { createContext, useContext } from "react"

export const vibesContext = createContext()
export const useVibes = () => useContext(vibesContext)
export default useVibes