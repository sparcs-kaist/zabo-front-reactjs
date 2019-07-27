import React, { PureComponent } from "react"
import { connect } from "react-redux"

import ZaboPage from "./ZaboPage"
import toJS from "hoc/toJS"

import { getZabo } from "../../../store/reducers/zabo"

class ZaboPageContainer extends PureComponent {
	componentDidMount() {
		const { getZabo, zaboId } = this.props
		getZabo(zaboId)
	}

	render() {
		return (
			<ZaboPage {...this.props} />
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const { zaboId } = ownProps
	return {
		zabo: state.getIn(['zabo', 'zabos', zaboId])
	}
}

const mapDispatchToProps = {
	getZabo
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(toJS(ZaboPageContainer))
