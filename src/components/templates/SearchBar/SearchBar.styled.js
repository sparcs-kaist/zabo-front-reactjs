import styled, { css } from 'styled-components';

export const SearchBarContainer = styled.div`
  #dimmer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const SearchBarWrapper = styled.div`
  @font-face {
    font-family: "NanumSquareRegular";
    src: url(../../../lib/fonts/NanumSquareRegular.ttf) format("truetype");
  }
  @font-face {
    font-family: "NanumSquareBold";
    src: url(../../../lib/fonts/NanumSquareBold.ttf) format("truetype");
  }
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: 582px;
  max-height: 439px;
  overflow-y: scroll;

  background-color: white;
  border-radius: 4px;

  .divider {
    margin: 0 6px;
    position: relative;
    border: .5px solid #E9E9E9;
  }
  ${props => (props.searchFocused ? css`
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  ` : css`
  `)}
`;

SearchBarWrapper.Header = styled.div`
  height: 39px;
  position: relative;
  top: 0;

  img.search-icon {
    position: absolute;
    top: 12px;
    left: 16px;
    height: 16px;
    display: block;
    align-self: center;
  }
`;

SearchBarWrapper.Header.SearchBar = styled.div`
  input {
    width: 100%;
    padding: 10px 48px;
    font-size: 16px;
    line-height: 18px;
    color: #202020;
    border: 0;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #BCBCBC;
    }
  }
  ${props => (props.searchFocused ? css`
    input {
      border-radius: 0;
      background-color: white;
    }
  ` : css`
    input {
      border-radius: 4px;
      background-color: #F4F4F4;
    }
  `)}
`;

SearchBarWrapper.Body = styled.div`
  position: relative;
  ${props => (props.searchFocused ? css`` : css`
    display: none;
  `)}
  ${props => (
    !props.search ? css`
      padding: 36px 16px;
    ` : props.isResultsEmpty ? css`
          padding: 0 16px;
        ` : css`
          padding: 24px 16px;
        `
  )}

  h3 {
    margin: 0 0 8px 0;
    font-size: 16px;
    color: #8F8F8F;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0 0 24px 0;
    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 40px;
      margin: 0 -16px;
      padding: 0 16px;
      &:hover, &:focus {
        background-color: #F4F4F4;
      }
      a {
        line-height: 40px;
        width: 100%;
      }
    }
  }
`;

SearchBarWrapper.Body.TagBtn = styled.div`
  margin-top: 20px;

  button.tag-button {
    font-size: 16px;
    line-height: 18px;
    color:  #143441;
    padding: 10px 14px;
    margin: 0 12px 10px 0;
    border: 1px solid #143441;
    border-radius: 4px;
    &:hover, &:focus {
      color: white;
      background-color: #143441;
    }
  }
`;
