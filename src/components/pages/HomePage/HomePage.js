import React, { PureComponent } from 'react';
import ZaboList from 'templates/ZaboList';
import Header from 'templates/Header';
import HomePageWrapper from './HomePage.styled';

class HomePage extends PureComponent {
  // state = {
  //  searchFocused: false,
  // }
  //
  // _onSearchFocusBlur = () => this.setState (prevState => ({
  //  searchFocused: !prevState.searchFocused,
  // }))

  render () {
    // const { searchFocused } = this.state;

    return (
      <HomePageWrapper className="animated fadeIn">
        <Header rightGroup={<Header.AuthDropdown />} />
        <div className="container">
          {/* <Header> */}
          {/*   <div className={`blur animated fadeIn ${searchFocused ? 'show' : ''}`} /> */}
          {/*   <Header.Search> */}
          {/*    <SearchBar */}
          {/*      onFocus={this._onSearchFocusBlur} */}
          {/*      onBlur={this._onSearchFocusBlur} */}
          {/*      isOpen={searchFocused} */}
          {/*    /> */}
          {/*   </Header.Search> */}
          {/*   {searchFocused || ( */}
          {/*   <Link to="/zabo/upload"> */}
          {/*    <Header.AddButton> */}
          {/*      <SVG icon="plus" color="white" size="lg" /> */}
          {/*    </Header.AddButton> */}
          {/*   </Link> */}
          {/*   )} */}
          {/* </Header> */}
          <ZaboList type="main" />
        </div>
      </HomePageWrapper>
    );
  }
}

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default HomePage;
