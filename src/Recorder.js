import React, { useState, useEffect } from "react";

let recordedBlobs = [];
let mediaRecorder = null;
let mediaSource = null;

export function startRecording(stream) {
  console.log(stream);
  let options = { mimeType: "video/webm" };
  recordedBlobs = [];
  try {
    mediaRecorder = new MediaRecorder(stream, options);
  } catch (e0) {
    console.log("Unable to create MediaRecorder with options Object: ", e0);
    // try {
    //   options = {mimeType: 'video/webm,codecs=vp9'};
    //   mediaRecorder = new MediaRecorder(stream, options);
    // } catch (e1) {
    //   console.log('Unable to create MediaRecorder with options Object: ', e1);
    //   try {
    //     options = 'video/vp8'; // Chrome 47
    //     mediaRecorder = new MediaRecorder(stream, options);
    //   } catch (e2) {
    alert(
      "MediaRecorder is not supported by this browser.\n\n" +
        "Try Firefox 29 or later, or Chrome 47 or later, " +
        "with Enable experimental Web Platform features enabled from chrome://flags."
    );
    console.error("Exception while creating MediaRecorder:", e2);
    return;
  }
  // }
  // }
  console.log("Created MediaRecorder", mediaRecorder, "with options", options);
  // mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(100); // collect 100ms of data
  console.log("MediaRecorder started", mediaRecorder);
  // sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
}

function handleSourceOpen(event) {
  console.log("MediaSource opened");
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  console.log("Source buffer: ", sourceBuffer);
}

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

export function stopRecording(video) {
  console.log("Recorder stopped");
  const superBuffer = new Blob(recordedBlobs, { type: "video/webm" });

  mediaRecorder.stop();
  console.log("Recorded Blobs: ", recordedBlobs);
  video.src = window.URL.createObjectURL(superBuffer);
  video.controls = true;
  download();
}
function download() {
  const blob = new Blob(recordedBlobs, { type: "video/webm" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "test.webm";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}

export default (Recorder = ({ stream }) => {
  useEffect(() => {
    if (stream) startRecording(stream);
  }, [stream]);
  return "recorder";
});
