import styled from "styled-components"

const SearchBarWrapper = styled.div`
z-index: 1;
width: 100%;
display: flex;
flex-direction: column;

.search {
  height: 50px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: text;
}

.search-Bar {
    width: 100%;
    border-radius: 10px;
    outline: none;
    background-color: #efefef;
}

.search-input {
    width:calc(100% - 60px);
    height: 90%;
    outline: none;
    border: none;
    margin-left: 10px;
    background-color: #efefef;
    font-size : 20px;
} 
.search-input::placeholder {
  font-size : 20px;
}

.search-icon {
  position: absolute;
  right: 20px;
  height: 20px;
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
}
`

export default SearchBarWrapper
