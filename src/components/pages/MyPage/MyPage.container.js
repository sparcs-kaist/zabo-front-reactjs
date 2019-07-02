import React, { PureComponent } from "react"
import { connect } from "react-redux"

import toJS from 'hoc/toJS'
import MyPage from "./MyPage"

import { isAuthenticated } from "../../../lib/utils"

class MyPageContainer extends PureComponent {
	render() {
		console.log("my page container", this.props.isAuthenticated)
		return (
			<MyPage {...this.props} />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: isAuthenticated(state),
    info : state.getIn(['auth', 'info']),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(toJS(MyPageContainer))
