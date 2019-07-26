import React, { PureComponent } from "react"
import { connect } from "react-redux"

import ZaboPage from "./ZaboPage"
import toJS from "hoc/toJS"

class ZaboPageContainer extends PureComponent {
	render() {
		return (
			<ZaboPage {...this.props} />
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
)(toJS(ZaboPageContainer))