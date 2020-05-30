import React, { useState, useEffect } from "react";

const Timer = ({ isActive, setStream }) => {
  const [seconds, setSeconds] = useState(0);
  const [diag, setDiag] = useState("none");
  const [count, setCount] = useState(1);
  const [fillStyle, setFillStyle] = useState(0);
  const canvasRef = React.useRef(null);
  useEffect(() => {
    setCount(count + 1);
    setDiag(`isActive ${isActive} : ${count}`);
  }, [isActive]);
  const [ctx, setCtx] = useState(null);
  const IMG_HEIGHT = 80,
    IMG_WIDTH = 100;
  function clearCanvas() {
    // clear canvas
    ctx.clearRect(0, 0, IMG_HEIGHT, IMG_WIDTH);
  }

  function fillRect() {
    const f = "#" + ("000000" + fillStyle.toString(16).toUpperCase()).slice(-6);
    // console.log(
    //   "#" + ("000000" + fillStyle.toString(16).toUpperCase()).slice(-6)
    // );
    ctx.fillStyle = f;
    setFillStyle(fillStyle + 0x10);
    ctx.fillRect(0, 0, 20, 20);
  }
  const FRAC = 10;
  const FREQ = 1000;
  const draw = cnt => {
    if (!ctx) return;
    let whole = Math.floor(cnt / FRAC);
    let part = cnt - whole * FRAC;

    clearCanvas();
    ctx.scale(1, 1);
    ctx.fillStyle = "black";
    ctx.font = "20px serif";
    ctx.fillText(`${whole}:${part}`, 0, 40);
    fillRect();
  };

  const [time, setTime] = React.useState(0);
  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      if (canvas.getContext("2d")) {
        setCtx(canvas.getContext("2d"));
        // draw(100);
      } else {
        alert("Canvas not supported!");
      }
    }
  }, [canvasRef]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
        draw(seconds);
      }, FREQ);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    } else if (seconds > 10) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);
  const videoRef = React.useRef(null);

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      const stream = canvasRef.current.captureStream(10);
      videoRef.current.srcObject = stream;
      if (setStream) setStream(stream);
    }
  }, [videoRef, canvasRef]);
  return (
    <div className="app">
      {diag}
      <canvas
        ref={canvasRef}
        id="clock"
        width={IMG_WIDTH}
        height={IMG_HEIGHT}
        back="true"
      />
      <video
        ref={videoRef}
        id="video"
        width={IMG_WIDTH}
        height={IMG_HEIGHT}
        autoPlay
      />
    </div>
  );
};
export default Timer;
