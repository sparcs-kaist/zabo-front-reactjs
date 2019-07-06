import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import MyPageWrapper from "./MyPage.styled"

class MyPage extends PureComponent {
	render() {
		return (
			<MyPageWrapper className="animated fadeIn">
				MyPage Hello~
			</MyPageWrapper>
		)
	}
}

MyPage.propTypes = {
}

MyPage.defaultProps = {
}

export default MyPage
