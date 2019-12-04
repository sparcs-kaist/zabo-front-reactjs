import React, { PureComponent } from "react"
import { connect } from "react-redux"

import GroupAddPage from "./GroupAddPage"
import toJS from "hoc/toJS"

class GroupAddPageContainer extends PureComponent {
	render() {
		return <GroupAddPage {...this.props} />
	}
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(GroupAddPageContainer))
