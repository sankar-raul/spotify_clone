import { useEffect, useRef, useState } from "react"
import useAppLayoutSettings from "../../context/AppLayoutSettings"
import './miniplayer.css'
import Songplate from "../bottomSection/desktopBottom/songPlate"
export const Miniplayer = () => {
    const [ isMiniplayer, setIsMiniplayer ] = useState(false)
    const { settings, applySettings } = useAppLayoutSettings()
    const [ isPipSupported, setIsPipSupported ] = useState(false)
    const miniPlayerRef = useRef(null)
    const [ pipWin, setPipWin ] = useState(null)
    useEffect(() => {
        setIsPipSupported('documentPictureInPicture' in window)
    }, [])

    useEffect(() => {
        if (settings.updateFor == 'miniPlayer') setIsMiniplayer(settings.miniPlayer)
    }, [settings])

    const handlePicInPic = async () => {
        try {
            const pipWindow = await documentPictureInPicture.requestWindow({ width: 400, height: 100 })
            setPipWin(pipWindow)
            pipWindow.document.body.appendChild(miniPlayerRef.current);

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!isPipSupported) return // return from this function if picture in picture feature is not supported in the browser
        if (isMiniplayer && miniPlayerRef) {
            (async () => {
                await handlePicInPic()
            })()
        } else {
            pipWin && pipWin.close()
        }
    }, [isMiniplayer, isPipSupported])

    useEffect(() => {
        if (pipWin) {
            const handleClose = () => {
                applySettings('miniPlayer', false)
            }
            pipWin.addEventListener('pagehide', handleClose)
        return () => {
            pipWin.removeEventListener('pagehide', handleClose)
        }
    }
    }, [pipWin])
    return (
        <div ref={miniPlayerRef} className="pip-miniplayer">
            Mini Player
            <Songplate />
        </div>
    )
}
export default Miniplayer