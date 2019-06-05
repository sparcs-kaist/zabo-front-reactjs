import styled, { css } from "styled-components"

const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background: #fff;
    transition: 1s;
    z-index: 1000;
    
    display: flex;
    padding: 24px;
    justify-content: space-between;
    align-items: center;
    border-top: 6px solid rgb(27, 50, 65);
`

export default HeaderWrapper
