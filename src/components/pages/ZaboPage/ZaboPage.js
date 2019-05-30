import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import ZaboPageWrapper from "./ZaboPage.styled"

import Card from "../../templates/Card"

class ZaboPage extends PureComponent {

	render() {
		const { showText } = this.props
		return (
			<ZaboPageWrapper>
				{showText && <h1>I'm visible</h1>}
				<Card>
					Card 입니다.
				</Card>
			</ZaboPageWrapper>
		)
	}
}

ZaboPage.propTypes = {
}

ZaboPage.defaultProps = {
}

export default ZaboPage
