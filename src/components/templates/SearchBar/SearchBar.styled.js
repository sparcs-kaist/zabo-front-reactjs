import styled from "styled-components"

const SearchBarWrapper = styled.div`
z-index: 1;
width: 100%;
display: flex;
flex-direction: column;

.search {
  height: 40px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: text;
}

.search-Bar {
    width: 100%;
    border-radius: 4px;
    outline: none;
    background-color: #f4f4f4;
}

.search-input {
    width:calc(100% - 60px);
    height: 90%;
    outline: none;
    border: none;
    margin-left: 10px;
    background-color: #f4f4f4;
    font-size : 16px;
} 
.search-input::placeholder {
  font-size : 16px;
}

.search-icon {
  position: absolute;
  right: 16px;
  height: 16px;
  display: block;
  align-self : center;
} 

.search-Button {
  background-color: black;
  margin-left: 1rem;
  width: 100px;
  height: auto;
}

.search-result {
  transition: 1s;
  overflow: hidden;
  &.show {
    height: auto;
    max-height: 1000px;
  }
  &.hide {
    /* visibility: hidden; */
    max-height: 0;
  }
  h3 {
    color: #8f8f8f;
    font-size: 12px;
    font-weight: lighter;
    margin-bottom: 0px;
  }
  ul {
    padding: 0px;
  }
  li {
    padding : 10px 0px 10px 0px;
    list-style: none;
    /* margin: 10px; */
    border-bottom: 1px solid #efefef;
    font-size: 16px;
    color: #143441;
    :last-child {
      border-bottom: 0px;
      padding-bottom: 15px;
    }
    :first-child {
      padding-top: 0px;
    }
  }
}
`

export default SearchBarWrapper
