import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { Link, NavLink } from "react-router-dom"

import HeaderWrapper from "./Header.styled"

import main from "static/images/main.jpg"
import logo from "static/logo/logo.svg"

class Header extends PureComponent {
	state = { fit: "", scrollY: 0, clicked: false }

	constructor(props) {
		super(props)
		this.state = {
			fit: window.innerHeight / window.innerWidth > 3 / 4 ? "fit-height" : "fit-width",
			scrollY: window.scrollY,
		}
	}

	componentDidMount() {
		// handle event
		window.addEventListener("optimizedResize", () => {
			this.setState({
				fit: window.innerHeight / window.innerWidth > 3 / 4 ? "fit-height" : "fit-width",
			})
			//console.log("Resource conscious resize callback!")
		})

		window.addEventListener("optimizedScroll", a => {
			this.setState({
				scrollY: window.scrollY,
				clicked: false
			})
			//console.log("scroll ", this.state)
		})
	}

	clickLogo = () => {
		this.setState(prevState => {
			const { scrollY, clicked } = prevState
			if (scrollY > 0 || clicked) {
				window.scrollTo(0, 0)
				return { clicked: false }
			} else {
				window.scrollTo(0, 1)
				return { clicked: true }
			}
		})
	}

	render() {
		const { fit, scrollY, clicked } = this.state
		const { route } = this.props.match.params
		const overlap = clicked || route || (scrollY > 0)

		return (
			<HeaderWrapper className={`${overlap ? "scrolled" : ""}`}>
				<img src={main} className={`banner ${fit}`} align="middle" />
				<div className="dimmer" />
				<div className="center-box"></div>
				<Link to="/" className="logo" onClick={this.clickLogo}>
					{/* <img src={logo} /> */}
					<svg
						aria-hidden="true"
						focusable="false"
						data-prefix="fas"
						data-icon="crop-alt"
						class="svg-inline--fa fa-crop-alt fa-w-16"
						role="img"
						fill="#12397d"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
					>
						<defs>
							<filter id="f4" x="0" y="0" width="200%" height="200%">
								<feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
								<feColorMatrix
									result="matrixOut"
									in="offOut"
									type="matrix"
									values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0"
								/>
								<feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
								<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
							</filter>
						</defs>
						<path
							fill="#12397d"
							d="M488 352h-40V96c0-17.67-14.33-32-32-32H192v96h160v328c0 13.25 10.75 24 24 24h48c13.25 0 24-10.75 24-24v-40h40c13.25 0 24-10.75 24-24v-48c0-13.26-10.75-24-24-24zM160 24c0-13.26-10.75-24-24-24H88C74.75 0 64 10.74 64 24v40H24C10.75 64 0 74.74 0 88v48c0 13.25 10.75 24 24 24h40v256c0 17.67 14.33 32 32 32h224v-96H160V24z"
							filter="url(#f4)"
						/>
					</svg>
					<div>ZABO</div>
				</Link>

				<nav>
					<ul>
						<li>
							<NavLink to="/home">
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to="/main">Main</NavLink>
						</li>
						<li>
							<NavLink to="/about">About</NavLink>
						</li>
					</ul>
				</nav>
			</HeaderWrapper>
		)
	}
}

Header.propTypes = {}

Header.defaultProps = {}

export default Header
