import PropTypes from 'prop-types'
import { useEffect } from 'react'
import styles from './footer.module.css'
import footerItems from './footerItems.json'

const Footer = () => {

    return (
        <footer className={styles.mainFooter}>
            <nav className={styles.links}>
                <div className={styles.linkSection}>
                    {
                        footerItems.links.map((link_set, idx) => (
                            <Links linkSet={link_set} key={idx}/>
                        ))
                    }
                </div>
                <div className={styles.socialLinks}>
                    {
                        footerItems.socials.map((social_details, idx) => (
                            <div onClick={() => window.open(social_details.href)} key={idx} className={styles.social} title={social_details.platform} style={{backgroundImage: `url(${social_details.icon})`}}></div>
                        ))
                    }
                </div>
            </nav>
            <div className={styles.legal}>
                <div className={styles.legal_links}>
                {
                    footerItems.legal_links.map((link_details, idx) => (
                        <a key={idx} href={link_details.href}>{link_details.text}</a>
                    ))
                }
                </div>
                <div className={styles.copyRight}>© 2024 Spotify AB</div>
            </div>
        </footer>
    )
}

const Links = ({ linkSet }) => {
    
    useEffect(() => {
        // console.log(linkSet)
    }, [linkSet])
    return (
        <div className={styles.linkSet}>
            <header className={styles.linkSectionTitle}>
                { linkSet.header }
            </header>
            <div className={styles.links_set}>
                {
                    linkSet.items.map((link_details, idx) => (
                        <a href={link_details.href} className={styles.final_link} key={idx}>{ link_details.text }</a>
                    ))
                }
            </div>
        </div>
    )
}
Links.propTypes = {
    linkSet: PropTypes.object.isRequired
}

export default Footer