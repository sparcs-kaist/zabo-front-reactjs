import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import ZaboPageWrapper from "./ZaboPage.styled"

class ZaboPage extends PureComponent {
	render() {
		return (
			<ZaboPageWrapper>
				{this.props.children}
				ZaboPage
			</ZaboPageWrapper>
		)
	}
}

ZaboPage.propTypes = {
}

ZaboPage.defaultProps = {
}

export default ZaboPage