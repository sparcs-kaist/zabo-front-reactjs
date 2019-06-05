import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import HomePageWrapper, { AddButton } from "./HomePage.styled"
import SearchBar from 'templates/SearchBar'
import SVG from "../../atoms/SVG"

class HomePage extends PureComponent {
	render() {
		return (
			<HomePageWrapper>
				<div className="container">
					<div className="header">
						<div className="search">
							<SearchBar/>
						</div>
						<Link to="/zabo/upload">
						<AddButton>
							<SVG icon={'plus'} color="white" size="lg" />
						</AddButton>
						</Link>
					</div>
				</div>
			</HomePageWrapper>
		)
	}
}

HomePage.propTypes = {
}

HomePage.defaultProps = {
}

export default HomePage
