import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import SearchBarWrapper from "./SearchBar.styled"
import searchIcon from 'static/images/search-icon-navy.png'

class SearchBar extends React.Component {
	state = {
		search: '',
	}

	_handleChange = (e) => {
		this.setState({ search: e.target.value })
	}

	render() {
		const { isOpen, ...props } = this.props

		return (
			<SearchBarWrapper>
				<div className="search">
					<div className="search-Bar">
						<input className="search-input" placeholder={'Search'} onChange={this._handleChange} {...props} />
					</div>
					<img className="search-icon" src={searchIcon}/>
				</div>
				<div className={`search-result ${isOpen ? 'show' : 'hide'}`}>
					<h3>Title</h3>
					<ul>
						<li>SPARCS 2018 Spring Recruiting</li>
						<li>SPARCS 2019 Spring Recruiting</li>
						<li>SPARCS 2020 Spring Recruiting</li>
					</ul>
					<h3>Uploader</h3>
					<ul>
						<li>SPARCS</li>
					</ul>
					<h3>Keyword</h3>
					<ul className="keyword-result">
						<li>#Advertisment</li>
						<li>#Club</li>
						<li>#Event</li>
						<li>#Recruiting</li>
						<li>#Student Concil</li>
					</ul>
				</div>
			</SearchBarWrapper>
		)
	}
}

SearchBar.propTypes = {
	isOpen: PropTypes.bool.isRequired,
}

SearchBar.defaultProps = {}

export default SearchBar
