import styled from "styled-components"
import { Link } from "react-router-dom"

const HomePageWrapper = styled.div`
	transition: 0.4s;
	animation-duration: 0.3s;

`

export const Header = styled.div`
	height: 50px;
	display: flex;
	align-items: center;
`

Header.Search = styled.div`
	flex: 1;
	margin-right: 12px;
`

Header.AddButton = styled.button`
	width: 60px;
	height: 40px;
	background-color: rgb(27, 50, 65);
`

export default HomePageWrapper
