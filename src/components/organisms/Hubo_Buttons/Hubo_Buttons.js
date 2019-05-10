import React, { PureComponent } from "react"

import Hubo_ButtonsWrapper from "./Hubo_Buttons.styled"

class Hubo_Buttons extends PureComponent {
	render() {
		const { name, Actions } = this.props

		const showText = Actions.showHeading
		const hideText = Actions.hideHeading

		let buttonFunction = showText
		switch (name) {
			case "SHOW":
				break
			case "HIDE":
				buttonFunction = hideText
				break
			default:
		}

		return (
			<Hubo_ButtonsWrapper>
				<button onClick={ buttonFunction }>{ name }</button>
			</Hubo_ButtonsWrapper>
		)
	}
}

Hubo_Buttons.propTypes = {
}

Hubo_Buttons.defaultProps = {
}

export default Hubo_Buttons