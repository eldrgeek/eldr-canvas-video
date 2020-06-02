import React, { useState, useEffect } from "react";

const Timer = ({ height = 15, width = 40, isActive, setStream }) => {
  const [seconds, setSeconds] = useState(0);
  // const [fillStyle, setFillStyle] = useState(0);
  const canvasRef = React.useRef(null);
  const [fillStyle, setFillStyle] = useState(0);
  const [ctx, setCtx] = useState(null);
  function clearCanvas() {
    // clear canvas
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, width, height);
  }
  function fillRect() {
    const f = "#" + ("000000" + fillStyle.toString(16).toUpperCase()).slice(-6);
    ctx.fillStyle = f;
    setFillStyle(fillStyle + 0x10);
    ctx.fillRect(0, 0, 10, 10);
  }
  const FRAC = 10;
  const FREQ = 100;
  const draw = cnt => {
    let whole = Math.floor(cnt / FRAC);
    let part = cnt - whole * FRAC;
    clearCanvas();
    ctx.scale(1, 1);
    ctx.fillStyle = "black";
    ctx.font = "10px serif";
    ctx.fillText(`${whole}:${part}`, 15, 10);
    fillRect();
  };

  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      if (canvas.getContext("2d")) {
        setCtx(canvas.getContext("2d"));
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
  });

  useEffect(() => {
    if (canvasRef.current) {
      const stream = canvasRef.current.captureStream(10);
      if (setStream) setStream(stream);
    }
  }, [canvasRef, setStream]);
  return (
    <div className="app">
      <canvas
        ref={canvasRef}
        id="clock"
        width={width}
        height={height}
        back="true"
      />
    </div>
  );
};
export default Timer;
