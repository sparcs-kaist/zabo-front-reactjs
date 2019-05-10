import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import Hubo_ZaboPagesWrapper from "./Hubo_ZaboPages.styled"
import Hubo_Card from "../../templates/Hubo_Card";

class Hubo_ZaboPages extends PureComponent {
	render() {
		const { showText } = this.props

		return (
			<Hubo_ZaboPagesWrapper>
				{ showText && <h1>"This is the ZaboPage"</h1> }
				<Hubo_Card />
			</Hubo_ZaboPagesWrapper>
		)
	}
}

Hubo_ZaboPages.propTypes = {
}

Hubo_ZaboPages.defaultProps = {
}

export default Hubo_ZaboPages