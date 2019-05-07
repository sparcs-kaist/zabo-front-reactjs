import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import HyoungJoWrapper from "./HyoungJo.styled"

class HyoungJo extends PureComponent {

	state = { 
		open: false, 
		close: true,
	}

	toogle = () => {
		
	}

	render() {
		const { open, close } = this.state; // { open: ture, close: false };

		return (
			<HyoungJoWrapper>
				{ open && "Redux Tutorial" }
				<button onClick={() => { this.setState({ open: true })}}>click this button</button>
			</HyoungJoWrapper>
		)
	}
}



HyoungJo.propTypes = {
}

HyoungJo.defaultProps = {
}

export default HyoungJo