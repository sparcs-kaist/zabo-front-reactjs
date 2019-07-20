import styled from "styled-components"

/* ============ Wrapper ============ */
const HomePageWrapper = styled.div`
	transition: 0.4s;
	animation-duration: 0.3s;
	// 무슨 코드?
	
	/* 
	 * Poster Layout
	 * poster = 240px, column space = 10px
	 * .container padding = 0px 20px
	 * num of posters: total width
	 * 1: 240px
	 * 2: 490px   => 530 ~
	 * 3: 740px    => 780 ~ 
	 * 4: 990px    => 1030 ~
	 */
	@media (min-width: 0px) and (max-width: 530px) {
		//.container width auto with padding
	}
	@media (min-width: 530px) and (max-width: 780px) {
		.container { width: 530px; }
	}
	@media (min-width: 780px) and (max-width: 1030px) {
		.container { width: 780px; }
	}	
	@media (min-width: 1030px) {
		.container { width: 1030px; } 
	}

	.masonry {
		margin-top: 20px;
		width: 100% !important;
	}
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

/* ============ Zabo ============ */
export const Zabo = styled.div`
	@font-face {
    font-family: 'NanumSquareRegular';
    src: url(../../../lib/fonts/NanumSquareRegular.ttf) format('truetype');
  }
	@font-face {
    font-family: 'NanumSquareBold';
    src: url(../../../lib/fonts/NanumSquareBold.ttf) format('truetype');
  }

	// 600px 이상이면 240으로 고정하기. 최대 4줄
	width: 240px;
	
	@media (min-width: 0px) and (max-width: 530px) {
		// 240 이 아닌 화면의 절반
		width: calc(50% - 5px);
	}
`
Zabo.Poster = styled.div`	
	display: flex;
	background-color: lightgrey;
	box-shadow: 0px 3px 6px #A9A9A9;
	position: relative;
	
	img {	
		position: absolute;
		top: 0;
		left: 0;
	}
`
Zabo.Writings = styled.div`
	padding: 15px 10px 20px 10px;
	// TODO: 아래 패딩 10px 늘림 - 근용이 확인
	font-color: #143441;
	
	.title {
		font-family: "NanumSquareBold";
 		font-size: 14px;
	}
	.author {
		margin-top: 5px;
		font-family: "NanumSquareRegular";
		font-size: 10px;
	}
`

