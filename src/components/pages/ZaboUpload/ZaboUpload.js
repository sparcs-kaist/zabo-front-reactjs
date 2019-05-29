import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import ZaboUploadWrapper from "./ZaboUpload.styled"

class ZaboUpload extends PureComponent {
	render() {
		return (
			<ZaboUploadWrapper>
				{this.props.children}
				ZaboUpload
			</ZaboUploadWrapper>
		)
	}
}

ZaboUpload.propTypes = {
}

ZaboUpload.defaultProps = {
}

export default ZaboUpload