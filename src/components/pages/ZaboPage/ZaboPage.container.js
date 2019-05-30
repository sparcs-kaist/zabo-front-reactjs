import React, { PureComponent } from "react"
import { connect } from "react-redux"

import ZaboPage from "./ZaboPage"

class ZaboPageContainer extends PureComponent {
	render() {
		return (
			<ZaboPage {...this.props} />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		showText: state.getIn(["todo", "showText"])
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ZaboPageContainer)
