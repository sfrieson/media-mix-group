import React, { useState } from "react";
import { Link } from "react-router-dom";

import Masonry from "react-masonry-component";

import Loading from "../Loading";

import "./style.css";

const masonryOptions = {
  columnWidth: ".gallery-list-item",
  itemSelector: ".gallery-list-item",
  percentPosition: true,
};

export default function Gallery(props) {
  const [loaded, setLoaded] = useState(false);

  let items = [];
  props.gallery.forEachItem((item) =>
    items.push(
      <li key={item.id} className="gallery-list-item">
        <Link
          className="gallery-list-item-link"
          to={`/${props.slug}/${item.id}`}
        >
          <item.Thumbnail {...item} />
        </Link>
      </li>
    )
  );

  return (
    <>
      {!loaded && <Loading />}
      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 200ms" }}>
        <Masonry
          className="gallery-list contain"
          elementType="ul"
          options={masonryOptions}
          onImagesLoaded={() => setLoaded(true)}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
        >
          {items}
        </Masonry>
      </div>
    </>
  );
}
