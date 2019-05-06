import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import VisualTextToggleButton from "./VisualTextToggleButton"

import * as appActions from "store/reducers/app"

class VisualTextToggleButtonContainer extends PureComponent {
	render() {
		return (
			<VisualTextToggleButton {...this.props} />
		)
	}
}

const mapStateToProps = (state) => {
	return {

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		AppActions: bindActionCreators(appActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VisualTextToggleButtonContainer)
