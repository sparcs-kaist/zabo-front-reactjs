import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import CardWrapper from "./Card.styled"
import Buttons from "../Buttons"



class Card extends PureComponent {
	render() {
		return (
			<CardWrapper>
				Card
				<Buttons/>
			</CardWrapper>
		)
	}
}

Card.propTypes = {
}

Card.defaultProps = {
}

export default Card
