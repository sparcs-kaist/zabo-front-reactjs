import styled from "styled-components"

const PWAPromptWrapper = styled.div`
	position: fixed;
	top: 0;
	width: 100%;
	height: 40px;
	background-color: #62666a;
	z-index: 1000;
	.container {
		height: 100%;
		flex-direction: row;
		align-items: center;
	}
	
	img {
		height: 25px;
		margin-right: 20px;
	}
	
	.texts {
		flex: 1;
		overflow: hidden;
	
		* { 
			overflow: hidden; 
			text-overflow: ellipsis;
			white-space: nowrap; 
			color: white;
		}
		.title { font-size: 12px; }
		.desc { font-size: 10px; }
	}
	
	button {
		background-color: transparent;
		margin-left: 20px; 
		height: 25px;
		padding: 0;
		color: cornflowerblue;
		font-size: 14px;		
	}
`

export default PWAPromptWrapper
