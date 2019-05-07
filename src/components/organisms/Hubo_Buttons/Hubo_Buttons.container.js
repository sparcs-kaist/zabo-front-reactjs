import React, { PureComponent } from "react"
import { connect } from "react-redux"

import Hubo_Buttons from "./Hubo_Buttons"

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

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Hubo_ButtonsContainer)