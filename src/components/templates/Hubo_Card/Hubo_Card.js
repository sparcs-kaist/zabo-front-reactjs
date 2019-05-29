import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import Hubo_CardWrapper from "./Hubo_Card.styled"
import Hubo_Buttons from "../../organisms/Hubo_Buttons";

class Hubo_Card extends PureComponent {
	render() {
		return (
			<Hubo_CardWrapper>
				<Hubo_Buttons name={ "SHOW" }/>
				<Hubo_Buttons name={ "HIDE" }/>
			</Hubo_CardWrapper>
		)
	}
}

Hubo_Card.propTypes = {
}

Hubo_Card.defaultProps = {
}

export default Hubo_Card