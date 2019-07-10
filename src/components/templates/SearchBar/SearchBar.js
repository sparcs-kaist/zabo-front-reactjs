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
    // this.input.focus();
    this.props.onFocus();
  };

	render() {
    const { isOpen, ...props } = this.props

		return (
			<SearchBarWrapper>
        <div className="search" >
          <div className="search-Bar">
            <input className="search-input" placeholder={'Search'} onChange={this._onChange} {...props} />
          </div>
          <img className="search-icon" src={searchIcon} />
          {/*<div className="search-Button" >*/}
          {/*</div>*/}
        </div>
          <div className={`search-result ${isOpen ? 'show' : 'hide'}`}>
            <h3>Title</h3>
            <ul>
              <li>Sparcs 2018 Spring Recruiting</li>
              <li>Sparcs 2019 Spring Recruiting</li>
              <li>Sparcs 2020 Spring Recruiting</li>
            </ul>
            <h3>Uploader</h3>
            <ul>
              <li>Sparcs</li>
            </ul>
            <h3>Keyword</h3>
            <ul>
              <li>Advertisment</li>
              <li>Club</li>
              <li>Event</li>
              <li>Recruiting</li>
            </ul>
          </div>
			</SearchBarWrapper>
		)
	}
}

SearchBar.propTypes = {
  isOpen: PropTypes.bool.isRequired
}

SearchBar.defaultProps = {
}

export default SearchBar