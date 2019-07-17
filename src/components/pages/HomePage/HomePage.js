import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import HomePageWrapper, { Header } from "./HomePage.styled"
import SearchBar from 'templates/SearchBar'
import SVG from "../../atoms/SVG"

class HomePage extends PureComponent {
	state = { searchBarFocussed: false }

	onSearchFocus = (e) => {
		this.setState({ searchBarFocussed: true })
	}

	onSearchBlur = (e) => {
		this.setState({ searchBarFocussed: false })
	}

	render() {
		const { searchBarFocussed } = this.state
		
		return (
			<HomePageWrapper className="animated fadeIn">
				<div className={`blur animated fadeIn ${searchBarFocussed ? "show" : ""}`} />
				<div className="container">
					hello
					<Header>
						<Header.Search>
							<SearchBar onFocus={this.onSearchFocus} onBlur={this.onSearchBlur} isOpen={searchBarFocussed} />
						</Header.Search>
						{searchBarFocussed || <Link to="/zabo/upload">
							<Header.AddButton>
								<SVG icon={'plus'} color="white" size="lg" />
							</Header.AddButton>
						</Link>
						}
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
