import React, { useRef, useEffect, useState } from "react";
export function getLocalStream() {
  var constraints = {
    audio: true,
    video: true
  };

  return navigator.mediaDevices
    .getUserMedia(constraints)
    .catch(e => console.log(e));
}
export function combineStreams(stream1, stream2) {
  return Promise.all([stream1, stream2]).then(([stream1, stream2]) => {
    if (stream1 && stream2) {
      const tracks = stream2.getTracks();
      tracks.forEach(track => stream1.addTrack(track));
      return stream1;
    }
  });
  // .then((result)=>(console.log(result)));
}

export function splitStream(stream) {
  console.log(stream);
  const audioTracks = stream.getAudioTracks();
  const videoTracks = stream.getVideoTracks();
  // return [0, 1].map(index => new MediaStream([audioTracks[0], videoTracks[1]]));
  return [0, 1].map(index => {
    const tracks = [];
    const pushTrack = track => {
      if (track) tracks.push(track);
    };
    pushTrack(audioTracks[index]);
    pushTrack(videoTracks[index]);
    return new MediaStream(tracks);
  });
}

export function StreamVIdeo({ stream, width = 50, height = 50 }) {
  const videoRef = useRef(null);
  const [displayMode, setDisplayMode] = useState("none");
  useEffect(() => {
    if (videoRef && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [videoRef, stream]);
  return (
    <div
      style={{ backgroundColor: "red", height, width, display: displayMode }}
    >
      {/* <div style={{ position: "absolute" }}> */}
      "above"
      <video
        height={height}
        width={width}
        onPlaying={() => setDisplayMode("block")}
        ref={videoRef}
        autoPlay
      />
      "beolow"
      {/* </div>  */}
    </div>
  );
}

export function getTimerStream({ height = 15, width = 40 }) {
  let fillStyle = 0;
  let ctx = null;
  function clearCanvas() {
    // clear canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, width, height);
  }
  function fillRect() {
    const f = "#" + ("000000" + fillStyle.toString(16).toUpperCase()).slice(-6);
    ctx.fillStyle = f;
    fillStyle += 0x10;
    ctx.fillRect(0, 0, 10, 10);
  }
  const FRAC = 10;
  const FREQ = 1000;
  let seconds = 0;
  const draw = cnt => {
    console.log("tick");
    let whole = Math.floor(cnt / FRAC);
    let part = cnt - whole * FRAC;
    clearCanvas();
    ctx.scale(1, 1);
    ctx.fillStyle = "black";
    ctx.font = "10px serif";
    ctx.fillText(`${whole}:${part}`, 15, 10);
    fillRect();
  };
  const canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");

  if (window.Xinterval) clearInterval(window.Xinterval);
  window.Xinterval = null;
  let interval = null;
  interval = setInterval(() => {
    seconds++;
    draw(seconds);
  }, FREQ);
  window.Xinterval = interval;
  return canvas.captureStream();
}

const timerStream = getTimerStream({});
exports.timerStream = timerStream;

export function allStreams() {
  const localSteam = getLocalStream;
}
