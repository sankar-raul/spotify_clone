import { useEffect, useRef, useState, createElement } from "react"
import useAppLayoutSettings from "../../context/AppLayoutSettings"
import './miniplayer.css'
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
            // if (!isMiniplayer) {
            //     await document.exitPictureInPicture()
            //     return
            // }
            const pipWindow = await documentPictureInPicture.requestWindow({ width: 400, height: 100 })
            setPipWin(pipWindow)
            pipWindow.document.body.appendChild(miniPlayerRef.current);
            // setTimeout(async () => {
            //     pipWindow.close()
            // }, 3000)
            // console.log(document.pictureInPictureElement)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(isMiniplayer)
        if (!isPipSupported) return // return from this function if picture in picture feature is not supported in the browser
        if (isMiniplayer && miniPlayerRef) {
            (async () => {
                await handlePicInPic()
                console.log("ok")
            // console.log(pipWin)

            })()
        } else {
            pipWin && pipWin.close()
        }
    }, [isMiniplayer, isPipSupported])

    useEffect(() => {
        if (pipWin) {
            console.log("sdd")
            const handleClose = () => {
                console.log("dwdnknd")
                applySettings('miniPlayer', false)
                console.log("Close")
            }
            pipWin.addEventListener('close', handleClose)
        return () => {
            pipWin.removeEventListener('close', handleClose)
        }
    }
    console.log(pipWin)
    }, [pipWin])
    return (
        <div ref={miniPlayerRef} className="pip-miniplayer">
            Mini Player
        </div>
    )
}
export default Miniplayer