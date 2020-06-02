import "./styles.css";
import Timer from "./Timer";
import React, { useState, useRef, useEffect } from "react";
import Recorder, { startRecording, stopRecording } from "./Recorder";
// Global variable
import VideoRecorder from "./VideoRecorder";
import Uploader from "./Uploader";
import VideoCanvas from "./VideoCanvas";
import LocalStreamVideo from "./LocalStreamVideo";
export default function App() {
  const [isActive, setIsActive] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [diag, setDiag] = useState("no App diag");
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
      if (!stream) setDiag("no stream");
      if (stream) startRecording(stream);
    }
    setIsRecording(!isRecording);
    setDiag("g");
  };
  return (
    <div className="App">
      {/* <Timer isActive={isActive} setStream={setStream} />
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
      </button> */}
      {/* <Recorder /> */}
      {/* <Uploader /> */}
      {diag}
      {/* {stream ? <VideoCanvas stream={stream} /> : ""} */}
      {/* <video ref={videoRef} id="recorded" playsInline loop /> */}
      {/* {stream ? <VideoRecorder stream={stream} /> : ""} */}
      <LocalStreamVideo />
    </div>
  );
}
