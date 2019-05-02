import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import LoadingWrapper from "./Loading.styled"

class Loading extends PureComponent {
	render() {

		return (
			<LoadingWrapper className="pre-loading" height={this.props.height}>
				<ul>
					<li>za</li>
					<li><span>b</span><span>o</span></li>
				</ul>
			</LoadingWrapper>
		)
	}
}

Loading.propTypes = {
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Loading.defaultProps = {
}

export default Loading
