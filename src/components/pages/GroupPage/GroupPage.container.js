import React, { PureComponent } from "react"
import { connect } from "react-redux"

import GroupPage from "./GroupPage"
import toJS from "hoc/toJS"

import { removeGroupUser } from "../../../store/reducers/auth.js"

import { isAuthenticated } from "lib/utils"

class GroupPageContainer extends PureComponent {
	render() {
		return (
			<GroupPage {...this.props} />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: isAuthenticated(state),
		info: state.getIn(['auth', 'info']),
	}
}

const mapDispatchToProps = {
	removeGroupUser,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(toJS(GroupPageContainer))
