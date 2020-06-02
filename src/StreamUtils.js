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

export function TrackVideo({ track, height = 50 }) {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef && track) {
      videoRef.current.srcObject = track;
    }
  }, [videoRef, track]);
  return <video ref={videoRef} autoPlay controls />;
}
