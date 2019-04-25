import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import LoadingWrapper from "./Loading.styled"

class Loading extends PureComponent {
	render() {
		return (
			<LoadingWrapper>
				<ul>
					<li>za</li>
					<li><span>b</span><span>o</span></li>
				</ul>
			</LoadingWrapper>
		)
	}
}

Loading.propTypes = {
}

Loading.defaultProps = {
}

export default Loading