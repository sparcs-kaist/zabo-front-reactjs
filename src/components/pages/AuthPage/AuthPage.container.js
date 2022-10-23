import React, { PureComponent } from "react";
import { connect } from "react-redux";

import AuthPage from "./AuthPage";

class AuthPageContainer extends PureComponent {
  render() {
    return <AuthPage {...this.props} />;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AuthPageContainer);
