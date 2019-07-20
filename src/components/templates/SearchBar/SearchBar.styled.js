import styled from "styled-components"

const SearchBarWrapper = styled.div`
	@font-face {
    font-family: 'NanumSquareRegular';
    src: url(../../../lib/fonts/NanumSquareRegular.ttf) format('truetype');
  }
  @font-face {
    font-family: 'NanumSquareBold';
    src: url(../../../lib/fonts/NanumSquareBold.ttf) format('truetype');
  }
  
	z-index: 1;
	width: 100%;
	display: flex;
	flex-direction: column;
	
	.search {
		height: 40px;
		display: flex;
		cursor: text;
	}
	
	.search-bar {
		width: 100%;
		border-radius: 4px;
		background-color: #f4f4f4;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.search-input {
		width:calc(100% - 60px);
		height: 90%;
		border: none;
		outline: none;
		margin-left: 15px;
		background-color: #f4f4f4;
		font-size : 16px;
		font-family: 'NanumSquareBold';
	} 
	.search-input::placeholder {
		font-family: 'NanumSquareRegular';
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
		overflow: hidden;
		margin-left: 10px;
		&.show {
			height: auto;
			max-height: 1000px;
		}
		&.hide {
			max-height: 0;
		}
	}
	h3 {
		color: #8f8f8f;
		font-size: 12px;
		font-weight: lighter;
		margin-bottom: 3px;
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
	.keyword-result {
		width: 100%;
		li {
		/* border: 1px solid black; */
		border-radius: 5px;
		display: inline-block;
		padding: 5px 10px 5px 10px;
		margin-right: 10px;
		margin-top: 10px;
		background: #143441;
		color: #ffffff;
		font-size: 14px;
		}
	}
`

export default SearchBarWrapper
