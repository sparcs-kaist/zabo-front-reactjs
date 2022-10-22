import React, { PureComponent } from "react";
import { connect } from "react-redux";

import Link from "./Link";

class LinkContainer extends PureComponent {
  render() {
    return <Link {...this.props} />;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LinkContainer);
