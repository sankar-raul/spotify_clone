import { useCallback, useEffect, useRef, useState } from "react";
import useLyrics from "../../context/Lyrics";
import useVibes from "../../context/Vibes";
import styles from "./lyrics.module.css";
import PropTypes from "prop-types";
import useGlobal from "../../context/Global";
export const Lyrics = () => {
  const { lyrics } = useLyrics();
  const [displayComponent, setDisplayComponent] = useState(<Loading />);
  useEffect(() => {
    switch (lyrics) {
      case "loading":
        setDisplayComponent(<Loading />);
        break;
      case "not found":
        setDisplayComponent(<NotFound />);
        break;
      case "error":
        setDisplayComponent(<ErrorMsg />);
        break;
      case null:
        setDisplayComponent("Error");
        break;
      default:
        setDisplayComponent(<ConstructLyricsLines lyrics={lyrics} />);
    }
  }, [lyrics]);
  return <div className={styles["lyrics-bar"]}>{displayComponent}</div>;
};
const ErrorMsg = () => {
  return <div>Something went wrong</div>;
};
const NotFound = () => {
  return <div>Lyrics not found</div>;
};
const Loading = () => {
  const { deviceType } = useGlobal();

  return (
    <div className={styles.loading}>
      <div>
        <div style={{ "--animation-delay": "0s" }}></div>
        <div style={{ "--animation-delay": ".2s" }}></div>
        <div style={{ "--animation-delay": ".5s" }}></div>
        {deviceType == "desktop" ? (
          <div style={{ "--animation-delay": ".7s" }}></div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
const ConstructLyricsLines = ({ lyrics }) => {
  const lyricsWraperRef = useRef(null);

  useEffect(() => {}, [lyrics]);
  return (
    <div ref={lyricsWraperRef} className={styles["lyrics-wraper"]}>
      {typeof lyrics == "object" ? (
        lyrics?.map((data, idx) => {
          return (
            <LyricsLine
              parentRef={lyricsWraperRef}
              key={idx}
              end_time={data?.end_time / 1000}
              timestamp={data?.start_time / 1000}
              lyrics={data?.text}
            />
          );
        })
      ) : (
        <ErrorMsg />
      )}
    </div>
  );
};
ConstructLyricsLines.propTypes = {
  lyrics: PropTypes.array,
};
const LyricsLine = ({ timestamp, lyrics, end_time, parentRef }) => {
  const { currentTime, setCurrentTime, Player } = useVibes();
  const lyricsRef = useRef(HTMLParagraphElement);
  // console.log(timestamp)
  const classes = {
    current: styles["current"],
    past: styles["past"],
  };
  const checkIsVisible = useCallback(() => {
    const parentRect = parentRef?.current?.getBoundingClientRect();
    const pRect = lyricsRef?.current?.getBoundingClientRect();
    const isVisible =
      pRect.bottom > parentRect.top && pRect.top < parentRect.bottom;
    return isVisible;
  }, [parentRef, lyricsRef]);
  const dragToView = useCallback(() => {
    if (lyricsRef.current) {
      // console.log(lyricsRef.current)
      // console.log(lyricsRef.current.getBoundingClientRect())
      if (currentTime >= timestamp && currentTime <= timestamp+0.5 && checkIsVisible()) {
        lyricsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }
  }, [currentTime]);
  const gotoTime = () => {
    setCurrentTime(timestamp);
    Player.currentTime = timestamp;
  };
  const classTo = timestamp <= currentTime ? classes.past : "";
  useEffect(() => {
    dragToView();
  }, [currentTime]);
  return (
    <p
      ref={lyricsRef}
      name={timestamp}
      onClick={gotoTime}
      className={`${styles["lyrics-line"]} ${classTo}`}
    >
      {lyrics}
    </p>
  );
};
LyricsLine.propTypes = {
  timestamp: PropTypes.number.isRequired,
  lyrics: PropTypes.string.isRequired,
  end_time: PropTypes.number.isRequired,
  parentRef: PropTypes.object.isRequired,
};
export default Lyrics;
