import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import ButtonWrapper, { Wrapper } from "./Button.styled"

class Button extends PureComponent {
	render() {
		return (
			<Wrapper>
				{this.props.children}
				Button
			</Wrapper>
		)
	}
}

Button.propTypes = {
}

Button.defaultProps = {
}

export default Button