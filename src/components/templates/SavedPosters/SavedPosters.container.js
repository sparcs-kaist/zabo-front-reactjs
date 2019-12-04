import React, { PureComponent } from "react"
import { connect } from "react-redux"

import SavedPosters from "./SavedPosters"

class SavedPostersContainer extends PureComponent {
	render() {
		return <SavedPosters {...this.props} />
	}
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedPostersContainer)
