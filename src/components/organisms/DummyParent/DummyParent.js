import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import DummyParentWrapper from "./DummyParent.styled"
import VisualText from "../VisualText"
import VisualTextToggleButton from "../VisualTextToggleButton"

class DummyParent extends PureComponent {
	render() {
		return (
			<DummyParentWrapper>
				<VisualText />
				<VisualTextToggleButton />
			</DummyParentWrapper>
		)
	}
}

DummyParent.propTypes = {
}

DummyParent.defaultProps = {
}

export default DummyParent
