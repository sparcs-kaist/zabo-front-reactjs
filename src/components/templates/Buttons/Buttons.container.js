import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import Buttons from "./Buttons"

import * as todoActions from "store/reducers/todo"

class ButtonsContainer extends PureComponent {
	render() {
		return (
			<Buttons {...this.props} />
		)
	}
}

const mapStateToProps = (state) => {
	return {

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		TodoActions: bindActionCreators(todoActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ButtonsContainer)
