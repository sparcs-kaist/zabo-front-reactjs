import React, { PureComponent } from "react"
import { connect } from "react-redux"

import MainPage from "./MainPage"

class MainPageContainer extends PureComponent {
	render() {
		return (
			<MainPage {...this.props} />
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
)(MainPageContainer)