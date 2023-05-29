import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";

export class Head extends React.PureComponent {
  constructor(props) {
    super(props);

    this.description = document.getElementById("description");
    this.descriptionDefaultText = this.description.content;
  }

  render() {
    document.title = this.props.title + " | MediaMixGroup.com";
    this.description.content =
      this.props.description || this.descriptionDefaultText;
    return null;
  }
}

Head.propTypes = {
  description: PropTypes.string,
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default withRouter(Head);
