import { useContext } from "react"
import { HeaderContext } from "./provider"
export const useMainHeaderTheme = () => useContext(HeaderContext)
export default useMainHeaderTheme
