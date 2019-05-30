import React, { PureComponent } from "react"
import VisualTextWrapper from "./VisualText.styled"

class VisualText extends PureComponent {

	render() {
		const { showVisualText, visualTextColor } = this.props

		return (
			<VisualTextWrapper style={{
				color: visualTextColor
			}}>
				{ showVisualText && "VisualText" }
			</VisualTextWrapper>
		)
	}
}

VisualText.propTypes = {
}

VisualText.defaultProps = {
}

export default VisualText
