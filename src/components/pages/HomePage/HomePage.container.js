import React, { PureComponent } from "react"
import { connect } from "react-redux"

import HomePage from "./HomePage"
import { getZaboList } from "../../../store/reducers/zabo"

import toJS from "hoc/toJS"

// deliver states(Redux) as props to the HomePage component
class HomePageContainer extends PureComponent {
	render() {
		return <HomePage {...this.props} />
	}
}

// Subscribe to the Redux "state"
const mapStateToProps = state => {
	return {
		zaboList: state.getIn(["zabo", "zaboList"]),
	}
}

// HomePage 에서 변경 사항이 생긴다면 널리 알려라.
const mapDispatchToProps = {
	getZaboList,
}

// index.js 가 HomePage 를 import 하는 것이 아닌, HomePage
export default connect(mapStateToProps, mapDispatchToProps)(toJS(HomePageContainer))
