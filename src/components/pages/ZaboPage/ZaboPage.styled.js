import styled from "styled-components"

const ZaboPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start ;

    .container {
        padding : 0;
    }
`

export default ZaboPageWrapper

export const Zabo = styled.div`
  position: relative;

	margin: 0 auto 24px auto;
	width: 375px; 
`

Zabo.Poster = styled.div`	
	background-color: lightgrey;
	box-shadow: 0px -1px 6px #A9A9A9;
	
`
Zabo.Writings = styled.div`
	// padding: 15px 10px 20px 10px;
	// TODO: 아래 패딩 10px 늘림 / 폰트 너무 작아 / font-weight - 근용이 확인
    color: #143441;
    padding: 0px 20px;
	
	.title {
        color: #143441;
        font-size: 24px;
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 15px;
	}
	.author {
		color: #8F8F8F;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 15px;
    }
    .description {
        color: #143441;
        font-size: 14px;
        font-family: 'NanumSquareRegular';

        margin-top: 15px;
        margin-bottom: 15px;
    }

    hr {
        color: #F4F4F4;
        border-width: 1px;
    }

    .keyword-result {
        padding: 0px;
        width: 100%;
        li {
					border-radius: 5px;
					display: inline-block;
					padding: 4.5px 10px 4.5px 10px;
					margin-right: 10px;
					margin-top: 10px;
					background: #143441;
					color: #ffffff;
					font-size: 14px;
					font-weight: bold;
        }
    }
`
