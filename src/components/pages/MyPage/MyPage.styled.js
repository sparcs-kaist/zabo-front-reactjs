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
	  flex-flow: row;
	  align-items: center;
	  width: fit-content;
	  cursor : pointer;
	  :hover {
	    
  	}
	}
	
	.selector {
	  margin-left : 2px;
	  font-family: NanumSquare;
	  width: 70px;
	}
	
	.group-dropdown {
    font-family: NanumSquare;
	  font-size: 16px;
	  font-weight: bold;
	  color: #8f8f8f;
	  width : 100px;
	  flex-flow: column;
	  align-items: start;
	}
	
	.group-dropdown-name {
	  margin : 5px 0;
	}
`;

export default MyPageWrapper
