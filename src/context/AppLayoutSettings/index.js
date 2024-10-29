import { useContext } from "react"
import { AppLayoutSettingsContext } from "./provider"
export const useAppLayoutSettings = () => useContext(AppLayoutSettingsContext)
export default useAppLayoutSettings