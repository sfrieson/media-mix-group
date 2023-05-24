/* global gtag */

const GA_MEASUREMENT_ID = "G-ZKZ7SEVHW4";

const analytics = {
  pageview: function (pagePath) {
    gtag("config", GA_MEASUREMENT_ID, { page_path: pagePath });
  },
};

export default analytics;
