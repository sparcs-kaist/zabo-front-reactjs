import React, { PureComponent } from "react"
import { connect } from "react-redux"

import toJS from 'hoc/toJS'
import MyPage from "./MyPage"


import { isAuthenticated } from "../../../lib/utils"

class MyPageContainer extends PureComponent {
	render() {
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

const mapDispatchToProps = {

};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(toJS(MyPageContainer))
