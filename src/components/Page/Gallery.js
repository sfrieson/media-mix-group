import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import analytics from "../../utils/analytics";
import Gallery from "../Gallery";
import Head from "../Head";
import Lightbox from "../Lightbox";
import Loading from "../Loading";

import "./style.css";

export default function GalleryPage(props) {
  const [gallery, setLoaded] = useState(
    props.gallery.items ? props.gallery : false
  );

  useEffect(() => {
    props.gallery.fetchItems().then(() => setLoaded(props.gallery));
  }, [props.gallery]);

  useEffect(() => {
    analytics.pageview(props.location.pathname);
  }, [props.location.pathname]);

  return (
    <>
      <h2 className="heading contain">{props.gallery.name}</h2>
      {!gallery && <Loading />}
      {gallery && (
        <>
          <Route
            exact
            path="/:gallery"
            render={(routerProps) => (
              <Head
                title={`Gallery: ${gallery.name}`}
                description={`Items from the ${gallery.name} gallery. ${gallery.items.size} items total.`}
              />
            )}
          />
          <Gallery
            key={gallery.slug}
            slug={gallery.slug}
            match={props.match}
            gallery={gallery}
          />
          <Route
            path="/:gallery/:photoId"
            render={(routerProps) => {
              const galleryItem = gallery.items.get(
                routerProps.match.params.photoId
              );
              // if (!galleryItem) return 404;
              const galleryPath = "/" + routerProps.match.params.gallery;
              return (
                <>
                  <Head
                    title={`Item: ${galleryItem.item.title}`}
                    description={`${galleryItem.item.title}, an item from the ${gallery.name} gallery.`}
                  />
                  <TransitionGroup>
                    <CSSTransition
                      key={routerProps.location.key}
                      classNames="fade"
                      timeout={300}
                    >
                      <Lightbox
                        media={galleryItem.item}
                        closeUrl={galleryPath}
                        prevUrl={
                          galleryItem.prev
                            ? galleryPath + "/" + galleryItem.prev
                            : null
                        }
                        nextUrl={
                          galleryItem.next
                            ? galleryPath + "/" + galleryItem.next
                            : null
                        }
                      />
                    </CSSTransition>
                  </TransitionGroup>
                </>
              );
            }}
          />
        </>
      )}
    </>
  );
}
