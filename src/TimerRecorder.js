import React, { useState, useRef, useEffect } from "react";

const TimerRecorder = ({ height, width, isActive, stream }) => {
  const [diag, setDiag] = useState("none");
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [videoRef, stream]);
  return (
    <div className="app">
      {diag}
      <video
        ref={videoRef}
        id="timerrecorder"
        width={width}
        height={height}
        autoPlay
      />
    </div>
  );
};
export default TimerRecorder;
