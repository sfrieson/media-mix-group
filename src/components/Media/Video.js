import React from "react";

export default function Video(props) {
  return <div dangerouslySetInnerHTML={{ __html: props.iframeHtml }} />;
}

export function Thumbnail(props) {
  return <div dangerouslySetInnerHTML={{ __html: props.iframeHtml }} />;
}
