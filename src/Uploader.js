import Input from "@material-ui/core/Input";
import React, { useState, useRef, useEffect } from "react";

export default function Uploader() {
  const videoRef = useRef(null);
  // setVideo();
  const doFetch = () => {
    fetch("example.avi")
      .then(response => {
        if (!response.ok) {
          console.log("not ok");
        } else {
          return response.blob({ type: "video/x-msvideo" });
        }
      })
      .then(blob => {
        console.log(blob);
        // const file = new Blob([response], { type: "video/webm" });
        videoRef.current.src = URL.createObjectURL(blob);
      })
      .catch(error => console.log(error));
  };
  return (
    <div>
      <video autoPlay controls ref={videoRef} />
      <Input
        id="input"
        name="input"
        type="file"
        accept="video/*"
        onChange={() => {
          let file = document.getElementById("input").files[0];
          console.log(file.type);
          if (file instanceof File) {
            file = new Blob([file], { type: file.type });
            //  videoRef.current.src = file
            videoRef.current.src = URL.createObjectURL(file);
          }
        }}
      />
      <button onClick={doFetch}>Fetch</button>
      <div id="video" />
    </div>
  );
}
