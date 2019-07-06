import styled from "styled-components"

const SearchBarWrapper = styled.div`

width: 100%;

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
`

export default SearchBarWrapper
