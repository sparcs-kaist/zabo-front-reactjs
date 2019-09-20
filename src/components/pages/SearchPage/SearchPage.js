import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import SearchBar from '../../templates/SearchBar'
import SearchPageWrapper from "./SearchPage.styled"

class SearchPage extends PureComponent {
	render() {
		return (
			<SearchPageWrapper>
				<SearchBar />
			</SearchPageWrapper>
		)
	}
}

SearchPage.propTypes = {
}

SearchPage.defaultProps = {
}

export default SearchPage