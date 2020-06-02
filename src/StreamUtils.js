var constraints = {
  audio: true,
  video: true
};

let getLocalStream = () => {
  return navigator.mediaDevices
    .getUserMedia(constraints)
    .catch(e => console.log(e));
};

getLocalStream().then(stream => console.log("stream:", stream));

export { getLocalStream };
