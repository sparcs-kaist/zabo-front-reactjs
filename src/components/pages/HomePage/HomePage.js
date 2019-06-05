import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import HomePageWrapper, { Header } from "./HomePage.styled"
import SearchBar from 'templates/SearchBar'
import SVG from "../../atoms/SVG"

class HomePage extends PureComponent {
	render() {
		return (
			<HomePageWrapper className="animated fadeIn">
				<div className="container">
					<Header>
						<Header.Search>
							<SearchBar/>
						</Header.Search>
						<Link to="/zabo/upload">
							<Header.AddButton>
								<SVG icon={'plus'} color="white" size="lg" />
							</Header.AddButton>
						</Link>
					</Header>
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
