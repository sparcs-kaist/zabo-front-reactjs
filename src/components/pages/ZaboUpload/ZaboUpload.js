import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import ZaboUploadWrapper from "./ZaboUpload.styled"

class ZaboUpload extends PureComponent {
	render() {
		return (
			<ZaboUploadWrapper className="zaboUploadWrapper">
				<div id="uploadSection">
					<div id="imageUpload">
						Upload Image Here
					</div>
					<div id="informationUpload">
						<div id="title">
							Title of this Zabo

						</div>
						<div id="uploader">
							<i class="fas fa-user-circle" />
							SPARCS
						</div>
						<div id="description">
							Description of Zabo
						</div>
						<div id="expiration">
							Expiration Date: 2019-06-10
						</div>
					</div>
				</div>
				<div id="submitSection">
					<button>
						제출
					</button>
				</div>
			</ZaboUploadWrapper>
		)
	}
}

ZaboUpload.propTypes = {
}

ZaboUpload.defaultProps = {
}

export default ZaboUpload
