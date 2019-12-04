import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import SavedPostersWrapper from "./SavedPosters.styled"

class SavedPosters extends PureComponent {
	render() {
		return (
			<SavedPostersWrapper>
				{this.props.children}
				poster
			</SavedPostersWrapper>
		)
	}
}

SavedPosters.propTypes = {}

SavedPosters.defaultProps = {}

export default SavedPosters
