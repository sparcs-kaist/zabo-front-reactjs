import styled from "styled-components"

/* ============ Zabo ============ */
export const ZaboCard = styled.div`
	width: 240px; // 530px 이상이면 240으로 고정하기. 최대 4줄
	
	@media (min-width: 0px) and (max-width: 530px) {
		width: calc(50% - 5px); // 240 이 아닌 화면의 절반
	}
`

ZaboCard.Poster = styled.div`	
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

ZaboCard.Writings = styled.div`
	padding: 15px 10px 20px 10px;
	// TODO: 아래 패딩 10px 늘림 / 폰트 너무 작아 / font-weight - 근용이 확인
	color: #143441;
	
	.title {
		font-weight: bold;
 		font-size: 14px;
	}
	.author {
		margin-top: 5px;
		font-weight: bold;
		font-size: 10px;
	}
	
	@media (min-width: 530px) {
		.title {
			font-size: 16px;
		}
		.author {
			font-size: 13px;
		}
	}
`

export default ZaboCard
