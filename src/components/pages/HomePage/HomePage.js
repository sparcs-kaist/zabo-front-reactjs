import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import HomePageWrapper from "./HomePage.styled"

class HomePage extends PureComponent {
	render() {
		return (
			<HomePageWrapper>
				HomePage
			</HomePageWrapper>
		)
	}
}

HomePage.propTypes = {}

HomePage.defaultProps = {}

export default (HomePage)
