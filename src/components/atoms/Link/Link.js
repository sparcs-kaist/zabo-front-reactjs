import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import LinkWrapper from "./Link.styled"

class Link extends PureComponent {
	render() {
		return (
			<LinkWrapper>
				{this.props.children}
				Link
			</LinkWrapper>
		)
	}
}

Link.propTypes = {}

Link.defaultProps = {}

export default Link
