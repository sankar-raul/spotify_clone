import { useEffect, useRef, useState } from "react"
import useAppLayoutSettings from "../../context/AppLayoutSettings"
import './miniplayer.css'
import Songplate from "../bottomSection/desktopBottom/songPlate"
import Controller from "../bottomSection/desktopBottom/controller"
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
            const pipWindow = await documentPictureInPicture.requestWindow({ width: 230, height: 140 })
            setPipWin(pipWindow)

             // Clone and append stylesheets
        Array.from(document.styleSheets).forEach((styleSheet) => {
            try {
                // Inline styles
                if (styleSheet.cssRules) {
                    const style = document.createElement("style");
                    Array.from(styleSheet.cssRules).forEach((rule) => {
                        style.appendChild(document.createTextNode(rule.cssText));
                    });
                    pipWindow.document.head.appendChild(style);
                }
                // External styles
                else if (styleSheet.href) {
                    const link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = styleSheet.href;
                    pipWindow.document.head.appendChild(link);
                }
            } catch (err) {
                console.error("Failed to copy styles:", err);
            }
        })
            const linkElement = document.createElement('link')
            linkElement.rel = 'stylesheet'
            linkElement.href = './miniplayer.css'
            pipWindow.document.head.appendChild(linkElement)
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
        <div ref={miniPlayerRef} style={{'--display': isMiniplayer ? "grid" : "none"}} className="pip-miniplayer">
            <Songplate />
            <Controller />
        </div>
    )
}
export default Miniplayer