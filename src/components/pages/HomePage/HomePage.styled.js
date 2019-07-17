import styled from "styled-components"

/* ============ Wrapper ============ */
const HomePageWrapper = styled.div`
	@font-face {
    font-family: 'NanumSquareRegular';
    src: url(../../../lib/fonts/NanumSquareRegular.ttf) format('truetype');
  }
	@font-face {
    font-family: 'NanumSquareBold';
    src: url(../../../lib/fonts/NanumSquareBold.ttf) format('truetype');
  }
	
	transition: 0.4s;
	animation-duration: 0.3s;
`

export default HomePageWrapper

/* ============ Header ============ */
export const Header = styled.div`
	display: flex;
	align-items: center;
	
	.blur {
		transition: 0.5s;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 0;
		z-index: 1;
		&.show {
			border-top: 6px solid rgb(27, 50, 65);
			height: 100%;
			background-color: rgba(255, 255, 255);
		}
	}
`
Header.Search = styled.div`
	flex: 1;
	margin-right: 12px;
	transition: 1s;
	z-index: 2;
`
Header.AddButton = styled.button`
	width: 60px;
	height: 40px;
	background-color: rgb(27, 50, 65);
`

/* ============ ZaboList ============ */
export const ZaboList = styled.div`
	margin-top: 20px;
`

/* ============ Zabo ============ */
export const Zabo = styled.div`
	width: 250px;
	//height: auto;
`
Zabo.Poster = styled.div`
	box-shadow: 0px 3px 6px #A9A9A9;
`
Zabo.Writings = styled.div`
	padding: 15px 10px 20px 10px;
	font-color: #143441;
`
Zabo.Writings.Title = styled.div`
	font-family: "NanumSquareBold";
 	font-size: 14px;
`
Zabo.Writings.Author = styled.div`
	margin-top: 5px;
	font-family: "NanumSquareRegular";
	font-size: 10px;
`
