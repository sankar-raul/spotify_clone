import PropTypes, { checkPropTypes } from 'prop-types'
import styles from './stickyHeader.module.css'
import React, { cloneElement, useEffect, useRef, useState } from 'react'

export const StickyHeader = ({children, background, style}) => {
    const [isSticky, setIsSticky] = useState(false)
    const [customBgcolor, setCustomBgcolor] = useState(null)
    const stickyDetectorRef = useRef(null)
    const modifiedChildren = React.isValidElement(children) ? cloneElement(children, {
        className: `${children.props.className || ''} ${isSticky ? styles.stickyHeader : ''} ${styles.header}`,
        style: {
            ...(children.props.style || {}),
            ...(isSticky ? style : {}),
            ...(customBgcolor ? { '--customBg': customBgcolor } : {})
        }
        
    }) : children
    useEffect(() => {
        background ? setCustomBgcolor(background) : setCustomBgcolor('#111111')
    }, [background])
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSticky(!entry.isIntersecting)
            },
            {
              root: null,
              threshold: [1]
            }
          )
        stickyDetectorRef && observer.observe(stickyDetectorRef?.current)
        return () => observer.disconnect()
    }, [])
    return (
        <>
        {modifiedChildren}
        <div style={{width: '100%', height: '0px', background: 'transparent', top: '0px', pointerEvents: 'none', zIndex: -10, position: 'absolute'}} ref={stickyDetectorRef}></div>
        </>
    )
}
StickyHeader.propTypes = {
    children: PropTypes.node,
    background: PropTypes.string,
    style: PropTypes.object
}
export default StickyHeader