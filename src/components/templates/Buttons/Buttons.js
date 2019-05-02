import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import ButtonsWrapper from "./Buttons.styled"

class Buttons extends PureComponent {
	render() {
		const TodoActions = this.props.TodoActions

		return (
			<ButtonsWrapper>
				<button onClick={TodoActions.showText}>Show</button>
				<button onClick={TodoActions.hideText}>Hide</button>
			</ButtonsWrapper>
		)
	}
}

Buttons.propTypes = {
}

Buttons.defaultProps = {
}

export default Buttons
