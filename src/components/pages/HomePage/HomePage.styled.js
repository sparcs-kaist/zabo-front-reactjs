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
	 * 3: 760px    => 800 ~ 
	 * 4: 1020px    => 1060 ~
	 */
	@media (min-width: 0px) and (max-width: 530px) {
		//.container width auto with padding
	}
	@media (min-width: 530px) and (max-width: 800px) {
		.container { width: 530px; }
	}
	@media (min-width: 800px) and (max-width: 1060px) {
		.container { width: 800px; }
	}
	@media (min-width: 1060px) {
		.container { width: 1060px; } 
	}

	.masonry {
		margin-top: 20px;
		width: 100% !important;
	}
	
	.loader {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin: 20px 0px 30px 0px;
	}
	
	.expand {
		display: inline-block;
		color: #143441;
		padding: 0 5px;
		font-size: 25px;
		animation: wave 1400ms linear infinite;
	}
	
	//@for $i from 2 through 7 {
	//	.expand:nth-child(#{$i}) {
	//		animation-delay: $i*200ms;
	//	}
	//}
	.expand:nth-child(2) {
		animation-delay: 200ms;
	}
	.expand:nth-child(3) {
		animation-delay: 400ms;
	}
	.expand:nth-child(4) {
		animation-delay: 600ms;
	}
	.expand:nth-child(5) {
		animation-delay: 800ms;
	}
	.expand:nth-child(6) {
		animation-delay: 1000ms;
	}
	.expand:nth-child(7) {
		animation-delay: 1200ms;
	}
	
	@keyframes wave {
		30% {
			transform: translateY(-9px) scale(1.1, 1.1);
		}
		100% {
			transform: initial;
		}
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
`;

/* ============ Feedbacks ============ */
export const FeedbackWrapper = styled.div`
	width: 100%;
	margin: 25px 0px;
	
	display: flex;
	flex-direction: row;
	justify-content: center;
`
FeedbackWrapper.Feedback = styled.div`
	width: 100%;
	max-width: 800px;
	display: flex;
	flex-direction: column;
	align-items: center;
	
	div:nth-child(2) {
		width: 100%;
		margin-top: 10px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	input {
		width: 100%;
		background-color: #f4f4f4;
		border-radius: 4px;
		border: none;
		outline: none;
		padding: 10px 15px;
		font-size: 16px;
	}
	input::placeholder {
		font-size: 16px;
	}
	
	button {
		width: 80px;
		height: 38px;
		margin-left: 5px;
		border-radius: 4px;
		
		color: white;
		background-color: #143441;
		box-shadow: 0px 3px 6px;
		font-size: 14px;
	}
	button:hover {
		opacity: 0.9;
	}
	
	@media (max-width: 530px) {
		font-size: 14px;
	
		div:nth-child(2) {
			height: 70px;
			flex-direction: column;
		}
		
		input {
			font-size: 14px;
		}
		input::placeholder {
			font-size: 14px;
		}
		
		button {
			width: 100%;
			padding: 6px 0px;
			margin: 6px 0px;
			font-size: 14px;
		}
	}
`
