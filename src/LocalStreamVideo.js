import React, { useState, useRef, useEffect } from "react";
import { getLocalStream, combineStreams, splitStream } from "./StreamUtils";
import Timer from "./Timer";

let SimpleVideo = ({ stream, height = 200 }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [videoRef, stream]);
  return (
    <React.Fragment>
      <div>
        <video
          // onPlay={() => setDisplayMode("block")}
          ref={videoRef}
          src={stream}
          autoPlay
          height={height}
          //  width={width}
          controls
        />
      </div>
    </React.Fragment>
  );
};
let LocalStream = ({ display = true, height = 200, width = 400 }) => {
  const videoRef = useRef(null);
  const [displayMode, setDisplayMode] = useState("none");
  const [timerStream, setTimerStream] = useState(null);
  const [theLocalStream, setTheLocalStream] = useState(null);
  const [combinedStream, setCombimedStream] = useState(null);
  const [splitStreams, setSplitStreams] = useState(null);

  useEffect(() => {
    setTheLocalStream(getLocalStream());
  }, []);
  useEffect(() => {
    combineStreams(theLocalStream, timerStream).then(combo => {
      setCombimedStream(combo);
    });
  }, [theLocalStream, timerStream]);
  useEffect(() => {
    if (combinedStream != null) {
      setSplitStreams(splitStream(combinedStream));
    }
  }, [combinedStream]);
  useEffect(() => {
    if (videoRef && theLocalStream) {
      theLocalStream
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(e => console.log(e));
    }
  }, [videoRef, theLocalStream]);

  return (
    <React.Fragment>
      <div style={{ display: displayMode }}>
        <div style={{ position: "absolute" }}>
          <Timer setStream={setTimerStream} />
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
      <SimpleVideo stream={combinedStream} autoPlay />
      {splitStreams ? (
        <div>
          <SimpleVideo stream={splitStreams[0]} height={40} autoPlay />
          <SimpleVideo stream={splitStreams[1]} height={40} />
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default LocalStream;
