import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import Hubo_Buttons from "./Hubo_Buttons"

import * as actions from "store/reducers/showHide"

class Hubo_ButtonsContainer extends PureComponent {
	render() {
		return (
			<Hubo_Buttons {...this.props} />
		)
	}
}

const mapStateToProps = (state) => {
	return {

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		Actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Hubo_ButtonsContainer)