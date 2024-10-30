import { createContext, useContext } from "react"

export const AppLayoutSettingsContext = createContext()
export const useAppLayoutSettings = () => useContext(AppLayoutSettingsContext)
export default useAppLayoutSettings