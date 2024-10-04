import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './rightSection.module.css'
import SecondaryButton from '../tiny_components/secondaryButton'

const RightSection = ({ state, handleWidth, handleRightCollapse }) => {
    const rightRef = useRef(null)
    const buttonRef = useRef(null)
    const [ display, setDisplay ] = useState('grid')
    const handleCollapse = () => {
        handleRightCollapse()
    }
    const handleEvent = () => {
        handleWidth('right', rightRef.current.offsetWidth)
    }
    useEffect(() => {
        if (state == 'expand') {
            setDisplay("grid")
        } else {
            setDisplay('none')
        }
    }, [state])
    useEffect(() => {
            // alert()
            handleEvent()
            const buttonRefCopy = buttonRef.current
            buttonRefCopy.addEventListener("click", handleCollapse)
            window.addEventListener("resize", handleEvent)
            return () => {
                window.removeEventListener("resize", handleEvent)
            }
    }, [])
    return (
        <section style={{display: display}} ref={rightRef} className={styles.rightSection}>
            <div className={styles.heading}>
                <div className={styles.song_heading}>One The Floor</div>
                <div className={styles.navigator}>
                    <div className={styles.threeDots}>
                </div>
                <div className={styles.closeBtn} ref={buttonRef}></div>
                </div>
            </div>
            <div className={styles.main}>
                <SongBody />
            </div>
        </section>
    )
}
RightSection.propTypes = {
    handleWidth: PropTypes.func.isRequired,
    handleRightCollapse: PropTypes.func.isRequired,
    state: PropTypes.string.isRequired
}

const SongBody = () => {

    return (
        <>
            <div className={styles.song_details}>
                <div className={styles.song_thumb}></div>
                <div className={styles.song_info}>
                    <div className={styles.song_title}>
                        <div><span>One The Floor</span></div>
                        <div className={styles.artists}><span>Jennifer Lopez, Pitbull</span></div>
                    </div>
                    <div className={styles.actions}>
                        <div title='Copy Song Link' className={styles.copy_btn}></div>
                        <div title='Add to Liked Songs' className={styles.add_song_btn}></div>
                    </div>
                </div>
            </div>
            <div className={styles.about_artist}>
                <div>
                    <p>About the artist</p>
                </div>
                <div className={styles.artist_info}>
                    <div className={styles.artist_name}><p>Jennifer Lopez</p></div>
                    <div className={styles.follow_section}>
                        <div>
                        19,982,788 monthly listeners dfd d s
                        </div>
                        <SecondaryButton text='Follow'/>
                    </div>
                    <div className={styles.artist_description}>
                        Singer, actress, dancer, producer, and businesswoman, Jennifer Lopez parlayed her Golden Globe-nominated portrayal of tragic Latin pop icon Selena in the 1997 biopic into pop culture superstardom, including forging a career as an influential pop star in her own right. Establishing a confident, sensual style, her first single, 1999's "If You Had My Love," went all the way to number one on the Billboard Hot 100. Just two years later, Lopez became the first woman to hit number one on the album chart and at the box office in the same week, with her second album, J.Lo, and her lead role opposite Matthew McConaughey in The Wedding Planner. While continuing to land occasional lead roles on the silver screen, she became a fixture in the Top Ten with albums including the Spanish-language Como Ama una Mujer (2007) and her seventh full-length, Love? (2011). Lopez issued another Top Ten studio album, A.K.A., in 2014 before leaving American Idol in 2016 to star in the NBC crime drama Shades of Blue (2016-2018). February 16, 2024 celebrated the release of This Is Me…Now, Lopez’s first studio album in nearly a decade, celebrates the anniversary of its sister album, This is Me…Then. The album, written and executive produced by Lopez and Rogét Chayed, along with Angel Lopez, Jeff "Gitty" Gitelman, HitBoy, Tay Keith and INK among others, effortlessly blends R&B, contemporary pop sounds and hip-hop beats, combined with her emotional signature vocals is Lopez’s most honest and personal yet.
                    </div>
                </div>
            </div>
            <div className={styles.credits}>
                <div className={styles.credit_title}>
                    <div>Credits</div>
                    <div>Show all</div>
                </div>
                <div>
                    <div>
                        <div><span>Jennifer Lopez</span></div>
                        <div><span>Main Artist</span></div>
                    </div>
                    <SecondaryButton text='Follow'/>
                </div>
                <div>
                    <div>
                        <div><span>Pitbull</span></div>
                        <div><span>Featured Artist</span></div>
                    </div>
                    <SecondaryButton text='Follow'/>
                </div>
                <div>
                    <div>
                        <div><span>Nadir Khayat</span></div>
                        <div><span>Composer</span></div>
                    </div>
                </div>
            </div>
            <div className={styles.next_queue}>next queue</div>
        </>
    )
}

export default RightSection