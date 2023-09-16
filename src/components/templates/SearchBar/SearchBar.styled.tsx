import styled, { css } from "styled-components";

import leftArrowNavy from "static/images/leftArrow-navy.png";
import searchIcon from "static/images/search-icon-navy.png";
import searchIconWhite from "static/images/search-icon-white.png";

export const SearchBarContainer = styled.div`
  max-width: 1032px;
  width: 100%;

  #dimmer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const WrapperComponent = styled.div<{
  type?: "search" | "upload";
  transparent?: boolean;
  isFocused?: boolean;
}>`
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: 582px;
  max-height: 439px;
  overflow-y: scroll;

  /* hide scroll bar */
  /* -webkit- (Chrome, Safari, newer versions of Opera) */

  &::-webkit-scrollbar {
    width: 0 !important;
  }

  /* Firefox */
  scrollbar-width: none;
  /* -ms- (Internet Explorer +10) */
  -ms-overflow-style: none;

  background-color: ${(props) => (props.transparent && !props.isFocused ? "transparent" : "white")};
  /* background-color: white; */
  border-radius: 4px;

  .divider {
    margin: 0 6px;
    position: relative;
    border: 0.5px solid #e9e9e9;
  }

  @media (max-width: 910px) {
    width: 100%;
    ${(props) =>
      props.type === "search" &&
      css`
        width: 180px;
        float: right;
        margin-right: 12px;
      `}
  }
  ${(props) =>
    props.isFocused
      ? css`
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

          @media (max-width: 910px) {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            max-height: 100%;
            border-radius: 0;
          }
        `
      : css``}
`;

const HeaderComponent = styled.div<{
  type?: "search" | "upload";
  transparent?: boolean;
  isFocused?: boolean;
}>`
  height: 38px;
  position: relative;
  top: 0;

  img {
    position: absolute;
    display: block;
    align-self: center;

    &.cancel-icon {
      top: 7px;
      right: 12px;
      height: 24px;
    }
  }

  div.search-icon {
    position: absolute;
    display: block;
    align-self: center;
    top: 12px;
    left: 16px;
    height: 16px;
    width: 16px;
    background: url(${(props) =>
        !props.isFocused && props.transparent ? searchIconWhite : searchIcon})
      no-repeat;
    background-size: contain;
  }

  @media (max-width: 910px) {
    ${(props) =>
      props.isFocused
        ? css`
            border-top: 6px solid rgb(27, 50, 65);
            height: 55px;
          `
        : ""}
    img.cancel-icon {
      top: 13px;
    }

    div.search-icon {
      ${(props) =>
        !props.isFocused && props.type === "search"
          ? css`
              background: url(${!props.isFocused && props.transparent
                  ? searchIconWhite
                  : searchIcon})
                no-repeat;
              background-size: contain;
            `
          : props.isFocused || props.type === "search"
          ? css`
              background: url(${leftArrowNavy}) no-repeat;
              background-size: contain;
              top: 15px;
              left: 16px;
              right: auto;
              width: 20px;
              height: 20px;
            `
          : css`
              top: 10px;
              right: 12px;
              left: auto;
            `}
    }
  }
`;

const HeaderSearchBar = styled.div<{
  type?: "search" | "upload";
  transparent?: boolean;
  isFocused?: boolean;
}>`
  input {
    display: inline-block;
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
      color: #bcbcbc;
    }

    ${(props) =>
      props.transparent && !props.isFocused
        ? css`
            background: rgba(255, 255, 255, 0.15);
            @media (max-width: 910px) {
              display: none;
            }
          `
        : props.isFocused
        ? css`
            border-radius: 0;
            background-color: white;
            @media (max-width: 910px) {
              height: 50px;
            }
          `
        : css`
            border-radius: 4px;
            background-color: #f4f4f4;
            @media (max-width: 910px) {
              display: none;
            }
          `}
    ${(props) =>
      props.type === "search" &&
      css`
        @media (max-width: 910px) {
          display: inline-block;
        }
      `}
  }
`;

const BodyComponent = styled.div<{
  isFocused?: boolean;
  search?: boolean;
  isResultsEmpty?: boolean;
}>`
  position: relative;

  ${(props) =>
    props.isFocused
      ? css``
      : css`
          display: none;
        `}
  ${(props) =>
    !props.search
      ? css`
          padding: 36px 16px;
        `
      : props.isResultsEmpty
      ? css`
          padding: 0 16px;
        `
      : css`
          padding: 24px 16px;
        `}
  h3 {
    margin: 0 0 8px 0;
    font-size: 16px;
    color: #8f8f8f;
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

      &:hover,
      &:focus {
        background-color: #f4f4f4;
      }

      img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
        border-radius: 50%;
      }

      a {
        display: inline-block;
        line-height: 40px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
`;

export const SearchBarWrapper = Object.assign(WrapperComponent, {
  Header: Object.assign(HeaderComponent, { SearchBar: HeaderSearchBar }),
  Body: BodyComponent,
});
