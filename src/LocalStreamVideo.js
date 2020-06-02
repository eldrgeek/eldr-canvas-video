import React, { useState, useRef, useEffect } from "react";
import { getLocalStream } from "./StreamUtils";
import Timer from "./Timer";
let theLocalStream = getLocalStream();
let LocalStream = ({ display = true, height = 200, width = 400 }) => {
  const videoRef = useRef(null);
  const [displayMode, setDisplayMode] = useState("none");

  useEffect(() => {
    if (videoRef) {
      theLocalStream
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(e => console.log(e));
    }
  }, [videoRef]);

  return (
    <React.Fragment>
      <div style={{ display: displayMode }}>
        <div style={{ position: "absolute" }}>
          <Timer />
        </div>
        <video
          onPlay={() => setDisplayMode("block")}
          ref={videoRef}
          autoPlay
          height={height}
          //  width={width}
          controls
        />
      </div>
    </React.Fragment>
  );
};
export default LocalStream;
