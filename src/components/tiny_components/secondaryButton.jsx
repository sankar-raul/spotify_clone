import PropTypes from 'prop-types'
import { useState } from 'react'

const SecondaryButton = ({text, onClick, styles}) => {
    const [ isHovered, setIsHovered ] = useState(false)
    const defaultStyles = {
    padding: '3px 15px',
    height: '32px',
    border: '1.5px solid #949494',
    borderRadius: '9999px',
    fontSize: '13px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderColor: isHovered ? '#fff' : '#949494',
    transform: isHovered ? 'scale(1.04)' : 'scale(1)'
    }
    return (
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => {setIsHovered(false)}} onClick={onClick} style={{...defaultStyles, ...styles}}>
            {text}
        </div>
    )
}
SecondaryButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    styles: PropTypes.object
}
export default SecondaryButton