import React, { PureComponent } from "react"
import { connect } from "react-redux"

import FloatingNavigator from "./FloatingNavigator"
import toJS from "hoc/toJS"

class FloatingNavigatorContainer extends PureComponent {
	render() {
		return <FloatingNavigator {...this.props} />
	}
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(FloatingNavigatorContainer))
