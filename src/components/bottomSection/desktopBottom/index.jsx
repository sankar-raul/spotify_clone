import PropTypes from 'prop-types'
import styles from './deskBottom.module.css'
import Controller from './controller'
import Songplate from './songPlate'
import LayoutController from "./layoutController"
export default function DesktopBottom({ className }) {
  
    return (
        <section className={`${styles.deskBottom} ${className || ''}`}>
            <Songplate />
            <Controller />
            <LayoutController />
        </section>
    )
}
DesktopBottom.propTypes = {
    className: PropTypes.string
}
