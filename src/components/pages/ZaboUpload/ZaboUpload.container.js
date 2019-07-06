import React, { PureComponent } from "react"
import { connect } from "react-redux"

import ZaboUpload from "./ZaboUpload";

import { uploadZabo } from "../../../store/reducers/zabo"

class ZaboUploadContainer extends PureComponent {
  render() {
    return (
      <ZaboUpload {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
};

// 자보 업로드를 dispatch 를 써야 하나..?
const mapDispatchToProps = {
  uploadZabo
};

// 여기 export 는 어디서 import 되지? index.js!
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ZaboUploadContainer);
