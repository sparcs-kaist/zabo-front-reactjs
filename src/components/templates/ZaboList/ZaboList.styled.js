import styled from "styled-components"

const ZaboListWrapper = styled.div`
	width: 100%;
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

export default ZaboListWrapper
