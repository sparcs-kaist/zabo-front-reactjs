import styled from "styled-components"

const MyPageWrapper = styled.div`
	margin: 0;
	padding: 0 20px;
	animation-duration: 0.3s;
	
	/* ===== Your Code Here ===== */
	font-size: 50px;
	
	.page-title {
	  font-size: 30px;
	  font-family: NanumSquare;
	  font-weight: bold;
	  color: #143441;
	}
	
	.user-name {
	  font-size: 24px;
	  margin-top: 30px;
	  font-family: NanumSquare;
	  font-weight: bold;
	  color: #143441;
	}
	
	.group-selector {
	  font-size: 16px;
	  font-weight: bold;
	  color: #8f8f8f;
	  display: flex;
	  flex-flow: column;
	  align-items: start;
	  width: fit-content;
	  cursor: pointer;
	    :hover {
	    
	    }
	}
	
	.group-name {
	  display: flex;
	  align-items : center;
	  flex-flow: row;
	}
	
	.selector {
	  margin-left : 2px;
	  font-family: NanumSquare;
	  width: fit-content;
	}
	
	.group-dropdown {
	  font-family: NanumSquare;
	  font-size: 16px;
	  font-weight: bold;
	  color: #8f8f8f;
	  cursor : pointer;
	  width : fit-content;
	  flex-flow: column;
	  align-items: start;
	}
	
	.group-dropdown-name {
	  padding : 5px 0;
	}
`;

export default MyPageWrapper
