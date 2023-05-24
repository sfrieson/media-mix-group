/* global gtag */

const GA_MEASUREMENT_ID = "UA-93839542-1";

const analytics = {
  pageview: function (pagePath) {
    gtag("config", GA_MEASUREMENT_ID, { page_path: pagePath });
  },
};

export default analytics;
