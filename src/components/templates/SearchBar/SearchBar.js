import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import searchIcon from 'static/images/search-icon-navy.png';

import SearchBarWrapper from "./SearchBar.styled"

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    }
  }

  _onChange = (e) => {
    this.setState({search: e.target.value})
  };

  _onFocus = () => {
    this.input.focus();
  };

	render() {
		return (
			<SearchBarWrapper>
        <div className="search" onClick={this._onFocus}>
          <div className="search-Bar">
            <input className="search-input" placeholder={'Search'} onChange={this._onChange} ref={(ref) => this.input = ref}/>
          </div>
          <img className="search-icon" src={searchIcon} />
          {/*<div className="search-Button" >*/}
          {/*</div>*/}
        </div>
			</SearchBarWrapper>
		)
	}
}

SearchBar.propTypes = {
}

SearchBar.defaultProps = {
}

export default SearchBar