import React, { PureComponent } from "react"
import { connect } from "react-redux"

import VisualText from "./VisualText"

class VisualTextContainer extends PureComponent {
	render() {
		return (
			<VisualText {...this.props} />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		showVisualText: state.getIn(["app", "showVisualText"]),
		visualTextColor: state.getIn(["app", "visualTextColor"])
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VisualTextContainer)
