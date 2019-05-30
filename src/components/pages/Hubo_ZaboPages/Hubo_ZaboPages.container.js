import React, { PureComponent } from "react"
import { connect } from "react-redux"

import Hubo_ZaboPages from "./Hubo_ZaboPages"

class Hubo_ZaboPagesContainer extends PureComponent {
	render() {
		return (
			<Hubo_ZaboPages {...this.props} />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		showText: state.getIn(["showHide", "showText"]),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Hubo_ZaboPagesContainer)