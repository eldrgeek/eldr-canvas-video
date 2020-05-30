import "./styles.css";
import Timer from "./Timer";
import React, { useState, useRef, useEffect } from "react";
import Recorder, { startRecording, stopRecording } from "./Recorder";
// Global variable

export default function App() {
  const [isActive, setIsActive] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const [video, setVideo] = useState(null);
  useEffect(() => {
    if (videoRef) setVideo(videoRef.current);
  }, [videoRef]);
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording(video);
      setIsActive(false);
    } else {
      startRecording(stream);
    }
    setIsRecording(!setIsRecording);
  };
  return (
    <div className="App">
      <Timer isActive={isActive} setStream={setStream} />
      <button
        className={`button button-primary button-primary-${
          isActive ? "active" : "inactive"
        }`}
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? "Pause" : "Start"}
      </button>

      <button onClick={toggleRecording}>
        {isRecording ? "Recording" : "Stopped"}
      </button>
      <video ref={videoRef} id="recorded" playsInline loop />
    </div>
  );
}
