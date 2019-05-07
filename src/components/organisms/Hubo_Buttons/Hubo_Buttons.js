import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import Hubo_ButtonsWrapper from "./Hubo_Buttons.styled"

class Hubo_Buttons extends PureComponent {
	render() {
		return (
			<Hubo_ButtonsWrapper>
				{this.props.children}
				Hubo_Buttons
			</Hubo_ButtonsWrapper>
		)
	}
}

Hubo_Buttons.propTypes = {
}

Hubo_Buttons.defaultProps = {
}

export default Hubo_Buttons