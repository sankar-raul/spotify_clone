import useCanvas from '../../context/canvas'
import styles from './rightSection.module.css'
import PropTypes from 'prop-types'

const Canvas = ({ src }) => {
    const { handleCanvasClick } = useCanvas()
    return (
        <div className={styles.canvasContainer}>
            <video onContextMenu={(e) => {e.preventDefault()}} onClick={handleCanvasClick} className={styles.canvas} src={src} autoPlay loop muted></video>
        </div>
    )
}
Canvas.propTypes = {
    src: PropTypes.string.isRequired
}
export default Canvas