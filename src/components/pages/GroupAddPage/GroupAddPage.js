import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import GroupAddPageWrapper from "./GroupAddPage.styled"

import SearchBar from "templates/SearchBar"

class GroupAddPage extends PureComponent {



	render() {
		return (
			<GroupAddPageWrapper>
        <SearchBar />
			</GroupAddPageWrapper>
		)
	}
}

GroupAddPage.propTypes = {
}

GroupAddPage.defaultProps = {
}

export default GroupAddPage