import styled, { css } from "styled-components"


const Scrolled = css`
    height: 100px;
    .center-box {
        visibility: hidden;
        width: 120px;
        height: 120px;
        left: 80px;
        top: 0;
        opacity: 0;
        transition: opacity 1s linear;
        transition: 1s;
    }

    .logo {
        position: relative;
        float: left;
        top: 20px;
        left: 0;
        display: flex;
        align-items: center;
        text-decoration: none;
        width: 200px;
        color: #12397d;

        svg, img {
            width: 60px;
            height: 60px;
        }
        div {
            font-family: 'Anton', cursive;
            transition: 1s;
            font-size: 40px;
            margin-left: 20px;
            font-weight: bold;
            visibility: visible;
        }

        p {
            opacity: 0;
            visibility: hidden;
        }
    }
    nav {
        ul {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);

            
            a.active {
                background-color: white;
                color: #000;
            }

            a:hover {
                background-color: yellow;
                color: #000;
            }
        }
    }

    .banner {
        opacity: 0;
    }
`

const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #000;
    transition: 1s;
    box-sizing: border-box;
    padding: 0 100px;
    z-index: 1000;

    .center-box {
        visibility: visible;
        position: absolute;
        top: calc(50% - 150px);
        left: calc(50% - 150px);
        width: 300px;
        height: 300px;
        background-color: rgba(255, 255, 255, 0.6);
        opacity: 1;
        transition: opacity 1s linear;
        transition: 1s;
    }

    .logo {
        position: absolute;
        left: calc(50% - 75px);
        top: calc(50% - 75px);
        margin: auto;
        transition: 1s;
        color: #12397d;
        
        svg, img {
            width: 150px;
            height: 150px;
            transition: 1s;
        }
        path {
            box-shadow: 12px 12px 2px 1px rgba(18, 57, 125, .2);
        }
        div {
            visibility: hidden;
        }
        p {
            visibility: visible;
            opacity: 1;
            transition: opacity 1s linear;
        }
    }
    .banner {
        background-position: center;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        transition: 1s;

        &.fit-height {
            height: 100%;
        }
        &.fit-width {
            width: 100%;
        }
    }

    .dimmer {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,0.4);
    }

    nav {
        position: relative;
        float: right;

        ul {
            position: relative;
            margin: 0;
            padding: 40px 0;
            display: flex;
            transition: 1s;
            opacity: 0;
            visibility: hidden;
            transform: translateX(100px);

            li {
                list-style: none;

                a {
                    color: #fff;
                    padding: 10px 15px;
                    text-decoration: none;
                }
            }
        }
    }


    &.scrolled {
        ${Scrolled};
    }
`

export default HeaderWrapper
