import styled from "styled-components"
import { Link } from "react-router-dom"

const HomePageWrapper = styled.div`
	transition: 0.4s;
	
	.container {
		width: 100%;
		max-width: 340px;
		margin: 0 auto;
	}
	.header {
		height: 50px;
		display: flex;
		align-items: center;
		.search {
			flex: 1;
			margin-right: 12px;
		}
	}
`

export const AddButton = styled.button`
	width: 60px;
	height: 40px;
	background-color: rgb(27, 50, 65);
`

export default HomePageWrapper
