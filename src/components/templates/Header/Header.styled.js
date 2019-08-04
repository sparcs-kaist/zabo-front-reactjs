import styled from "styled-components"

const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    transition: 0.4s;
    z-index: 1000;
    border-top: 6px solid rgb(27, 50, 65);
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    a {
    	margin-left: 2px;
    	margin-right: 5px;
    }
    
    .container {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
    }
`

export default HeaderWrapper

