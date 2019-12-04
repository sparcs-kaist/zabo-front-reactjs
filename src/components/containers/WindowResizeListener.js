import React from "react"
import { connect } from "react-redux"

import { addWindowResizeListener } from "../../lib/utils/throttle"
import { setWindowSize } from "../../store/reducers/app"
import toJS from "hoc/toJS"

class WindowResizeListener extends React.Component {
	listener = () => {}

	componentDidMount() {
		const { setWindowSize } = this.props

		this.listener = addWindowResizeListener(({ width, height }) => {
			setWindowSize({ width, height })
		})
	}
	componentWillUnmount() {
		this.listener()
	}

	render() {
		return null
	}
}

const mapStateToProps = state => {
	return {
		windowSize: state.getIn(["app", "windowSize"]),
	}
}

const mapDispatchToProps = {
	setWindowSize,
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(WindowResizeListener))
