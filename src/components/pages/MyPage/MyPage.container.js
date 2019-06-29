import React, { PureComponent } from "react"
import { connect } from "react-redux"

import MyPage from "./MyPage"

class MyPageContainer extends PureComponent {
	render() {
		return (
			<MyPage {...this.props} />
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
)(MyPageContainer)