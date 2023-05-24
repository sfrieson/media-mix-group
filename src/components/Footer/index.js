import React from "react";

import "./style.css";

const year = new Date().getFullYear();
export default function Footer() {
  return (
    <footer className="footer">
      <p>©{year} — Kenneth Frieson</p>
      <p className="footer__developer">
        Developed by{" "}
        <a
          href="https://stevenfrieson.com"
          target="_blank"
          rel="nofollow noreferrer noopener"
        >
          Steven Frieson
        </a>
        .
      </p>
      <div>
        <a
          href="https://www.contentful.com/"
          rel="nofollow noreferrer noopener"
          target="_blank"
        >
          <img
            src="https://images.ctfassets.net/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg"
            style={{ maxWidth: 100, width: "100%" }}
            alt="Powered by Contentful"
          />
        </a>
      </div>
    </footer>
  );
}
