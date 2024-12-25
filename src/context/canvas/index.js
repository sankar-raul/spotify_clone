import {createContext, useContext} from 'react'
export const CanvasContext = createContext()
export const useCanvas = () => useContext(CanvasContext)
export default useCanvas