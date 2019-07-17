import React, { PureComponent } from "react"
import { Link } from "react-router-dom"  // do not refresh, but render on Link clicked
import PropTypes from "prop-types"

import HomePageWrapper, { Header } from "./HomePage.styled";
import SearchBar from 'templates/SearchBar';
import SVG from "../../atoms/SVG";

class HomePage extends PureComponent {
	constructor (props) {
		super(props)
	}

	state = {
		searchFocused: false,
	};

	_onSearchFocusBlur = (e) =>
		this.setState(prevState => {
			return {
				searchFocused: !prevState.searchFocused
			}
		});

	render() {
		const { searchFocused } = this.state;

		return (
			<HomePageWrapper className="animated fadeIn">
				<div className="container">
					<Header>
						<div className={`blur animated fadeIn ${searchFocused ? "show" : ""}`} />
						<Header.Search>
							<SearchBar
								onFocus={this._onSearchFocusBlur}
								onBlur={this._onSearchFocusBlur}
								isOpen={searchFocused} />
						</Header.Search>
						{ searchFocused ||
						<Link to="/zabo/upload">
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
};

HomePage.defaultProps = {
};

export default HomePage
