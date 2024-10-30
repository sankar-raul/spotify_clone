import { createContext, useContext } from "react"

export const globalContext = createContext()
export const useGlobal = () => useContext(globalContext)
export default useGlobal