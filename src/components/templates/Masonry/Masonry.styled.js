import styled from "styled-components"

const MasonryWrapper = styled.section`
	position: relative;
	
	.grid-item {
		border: 1px solid black;
		position: absolute;
		display: flex;
		width: 150px;
		flex-direction: column;
		
		img {
			width: 100%;
			height: auto;
		}
	}
`

export default MasonryWrapper
