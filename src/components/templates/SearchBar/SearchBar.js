import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import axios from 'lib/axios'

import SearchBarWrapper from "./SearchBar.styled"

import searchIcon from 'static/images/search-icon-navy.png'

/* ==== search bar debounce ==== */
const searchAPI = text => {
	if (!text) return Promise.resolve({ data: { zabos: [], groups: [], categories: [] } })
	return axios.get('/search?query=' + encodeURIComponent(text))
}
const searchAPIDebounced = AwesomeDebouncePromise(searchAPI, 1000)

class SearchBar extends React.Component {
	state = {
		search: "",
		zaboSearch: [],
		uploaderSearch: [],
		keywordSearch: [],
		searchResults: {},
	}

	_updateResults = (data) => {
		const { zabos, groups, categories } = data
		this.setState({
			zaboSearch: zabos,
			uploaderSearch: groups,
			keywordSearch: categories,
		})
	}

	_handleChange = async (e) => {
		const { value: query } = e.target
		this.setState({ search: query, }) // keyboard inputs
		if (this.state.searchResults[query]) // load from caching
			this._updateResults(this.state.searchResults[query])
		const res = await searchAPIDebounced(query)
		this._updateResults(res.data)
		this.setState(prevState => ({
			searchResults: {
				...prevState.searchResults,
				[query]: res.data
			},
		}))
	}

	render() {
		const { zaboSearch, uploaderSearch, keywordSearch } = this.state
		const { isOpen, ...props } = this.props

		return (
			<SearchBarWrapper>
				<div className="search">
					<div className="search-bar">
						<input className="search-input" placeholder={'Search'} onChange={this._handleChange} {...props} />
					</div>
					<img className="search-icon" src={searchIcon}/>
				</div>
				<div className={`search-result ${isOpen ? 'show' : 'hide'}`}>
					<h3>Zabo</h3>
					<ul>
						{
							zaboSearch.map( zabo =>
								<li>
									<Link to={`/zabo/${zabo._id}`}>
										{ zabo.title }
									</Link>
								</li>
							)
						}
						{
							zaboSearch.length === 0 && <li>No Results</li>
						}
					</ul>
					<h3>Uploader</h3>
					<ul>
						{
							uploaderSearch.map( uploader =>
								<li>
									<Link to={`/group/${uploader.name}`}>
										{ uploader.name }
									</Link>
								</li>
							)
						}
						{
							uploaderSearch.length === 0 && <li>No Results</li>
						}
					</ul>
					<h3>Keyword</h3>
					<ul className="keyword-result">
						{
							keywordSearch.map( keyword =>
								<li>
									<Link to="/">
										{ keyword }
									</Link>
								</li>
							)
						}
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
