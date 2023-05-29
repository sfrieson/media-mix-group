import React from "react";

import Head from "../Head";
import Headshot from "./headshot.jpg";

import "./style.css";

export default function ContactPage() {
  return (
    <>
      <Head
        title="Contact"
        description="Get in touch with MediaMix Group for booking events, parties and more near Philadelphia."
      />
      <div className="contain">
        <h2 className="heading">Contact</h2>
        <div className="contact__page">
          <div className="contact__image">
            <img src={Headshot} alt="Portrait of Ken Frieson" />
          </div>
          <div className="contact__body">
            <div className="contact-info">
              <a
                href="mailto:kenfrieson@comcast.net"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email me
              </a>
              <br />
              <a href="tel://6102202741">(610) 220-2741</a>
            </div>
            <p className="bio">
              Ken Frieson, the founder of MediaMix Group, is a visual content
              creator based in the Philadelphia area. MediaMix Group is
              available for event photography and portraits. They're also
              available for your video production needs. Feel free to contact
              Ken to discuss your next project!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
