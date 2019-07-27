import React, { PureComponent } from "react"
import { connect } from "react-redux"
import toJS from 'hoc/toJS'

import ZaboUpload from "./ZaboUpload";

import { uploadZabo } from "../../../store/reducers/zabo"
import { isAuthenticated } from "../../../lib/utils"

class ZaboUploadContainer extends PureComponent {
  render() {
    return (
      <ZaboUpload {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    windowWidth: state.getIn(["app", "windowSize", "width"]),
    isAuthenticated: isAuthenticated(state),
    info : state.getIn(['auth', 'info']),
  }
};

const mapDispatchToProps = {
  uploadZabo
};

// 여기 export 는 어디서 import 되지? index.js!
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(ZaboUploadContainer));
