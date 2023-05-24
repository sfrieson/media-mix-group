import React, { useState } from "react";
const offscreen = document.getElementById("offscreen");
function useImageLoader(src) {
  const [loaded, setLoaded] = useState(false);

  const img = new window.Image();
  img.onload = () => {
    setLoaded(true);
    offscreen.removeChild(img);
  };
  img.src = src;
  offscreen.appendChild(img);
  return loaded;
}

export default function Photo(props) {
  const loaded = useImageLoader(props.url);
  return loaded ? (
    <img src={props.url} alt={props.caption} />
  ) : (
    <div
      style={{
        height: 0,
        paddingBottom: (100 * props.height) / props.width + "%",
        backgroundColor: "gray",
        width: "100vw",
      }}
    >
      loading
    </div>
  );
}

export function Thumbnail(props) {
  return <img src={props.thumb} alt={props.title} />;
}
