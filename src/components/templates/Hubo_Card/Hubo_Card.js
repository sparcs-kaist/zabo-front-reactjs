import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import Hubo_CardWrapper from "./Hubo_Card.styled"

class Hubo_Card extends PureComponent {
	render() {
		return (
			<Hubo_CardWrapper>
				{this.props.children}
				Hubo_Card
			</Hubo_CardWrapper>
		)
	}
}

Hubo_Card.propTypes = {
}

Hubo_Card.defaultProps = {
}

export default Hubo_Card