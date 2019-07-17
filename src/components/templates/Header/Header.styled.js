import styled, { css } from "styled-components"

const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background: #fff;
    transition: 0.4s;
    z-index: 0;
    border-top: 6px solid rgb(27, 50, 65);
    
    .container {
			display: flex;
			padding: 16px;
			justify-content: space-between;
			align-items: center;
    }
`

export default HeaderWrapper
