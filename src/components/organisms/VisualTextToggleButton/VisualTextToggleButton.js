import React, { PureComponent } from "react"
import VisualTextToggleButtonWrapper from "./VisualTextToggleButton.styled"

class VisualTextToggleButton extends PureComponent {
	render() {
		const { AppActions } = this.props

		const changeToRed = () => AppActions.changeVisualTextColor("red")
		const changeToBlue = () => AppActions.changeVisualTextColor("blue")

		return (
			<VisualTextToggleButtonWrapper>
				<button onClick={AppActions.toggleVisualText}>
					Show Text
				</button>
				<br />
				<button onClick={changeToRed}>
					changeTextToRed
				</button>
				<br />
				<button onClick={changeToBlue}>
					changeTextToBlue
				</button>
			</VisualTextToggleButtonWrapper>
		)
	}
}

VisualTextToggleButton.propTypes = {
}

VisualTextToggleButton.defaultProps = {
}

export default VisualTextToggleButton
