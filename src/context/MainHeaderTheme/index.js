import { createContext, useContext } from "react"

export const headerContext = createContext()
export const useMainHeaderTheme = () => useContext(headerContext)
export default useMainHeaderTheme
