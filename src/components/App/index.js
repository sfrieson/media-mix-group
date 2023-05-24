import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "../Footer";
import Header from "../Header";
import ContactPage from "../Page/Contact";
import GalleryPage from "../Page/Gallery";

const defaultGallery = "featured";
export default function App(props) {
  const menu = props.menu;
  return (
    <>
      <Router>
        <>
          <Route
            path="/:gallery?"
            render={(routerProps) => <Header menu={menu} {...routerProps} />}
          />
          <Switch>
            <Route path="/contact" component={ContactPage} />
            <Route
              path="/:gallery?"
              render={(routerProps) => (
                <GalleryPage
                  gallery={menu.findGallery(
                    routerProps.match.params.gallery || defaultGallery
                  )}
                  {...routerProps}
                />
              )}
            />
          </Switch>
        </>
      </Router>
      <Footer />
    </>
  );
}
