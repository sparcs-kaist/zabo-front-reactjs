import styled from "styled-components"

const HomePageWrapper = styled.div`
	transition: 0.4s;
	animation-duration: 0.3s;
	
	.blur {
		transition: 0.5s;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 0;
		z-index: 1;
		&.show {
			height: 100%;
			background-color: rgba(255, 255, 255);
		}
	}
`

export const Header = styled.div`
	min-height: 50px;
	display: flex;
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
`;

export default HomePageWrapper;
