import React, { PureComponent } from "react"

import FloatingNavigatorWrapper, { NavItem } from "./FloatingNavigator.styled"
import user from "static/images/user.svg"
import calendar from "static/images/calendar.svg"
import add from "static/images/add.svg"
import search from "static/images/search-icon-navy.png"

class FloatingNavigator extends PureComponent {
	state = { scrollY: window.scrollY, show: true }

	handleScroll = () => {
		this.setState(prevState => {
			return {
				scrollY: window.scrollY,
				show: prevState.scrollY > window.scrollY,
			}
		})
	}

	componentDidMount() {
		window.addEventListener("optimizedScroll", this.handleScroll)
	}
	componentWillUnmount() {
		window.removeEventListener("optimizedScroll", this.handleScroll)
	}

	render() {
		const { show } = this.state

		return (
			<FloatingNavigatorWrapper show={show}>
				<NavItem to="/" exact>
					<img src={calendar} alt="" />홈
				</NavItem>
				<NavItem to="/search" exact>
					<img src={search} alt="" />
					검색
				</NavItem>
				<NavItem to="/zabo/upload" exact>
					<img src={add} alt="" />
					업로드
				</NavItem>
				<NavItem to="/my-page" exact>
					<img src={user} alt="" />
					프로필
				</NavItem>
			</FloatingNavigatorWrapper>
		)
	}
}

FloatingNavigator.propTypes = {}

FloatingNavigator.defaultProps = {}

export default FloatingNavigator
