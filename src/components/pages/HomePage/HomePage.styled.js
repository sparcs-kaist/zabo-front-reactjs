import styled from "styled-components"

const HomePageWrapper = styled.div `
`;

export const SCWrapper = styled.div `
    transition: all 500ms ease;
    position: relative;
    margin: 0 auto;
    height: 250px;

    #cover {
        position: absolute;
        left: 0;
        top: 0;
        overflow: hidden;
        box-shadow: 0px 0px 30px 0px rgba(black, 0.5);

        &:after {
            content: " ";
            position: absolute;
            top: 0;
            left: 0;
            width: 80%;
            height: 50%;
            background-image: linear-gradient(-180deg, rgba(white, 0.5), transparent 90%);
            transform: skewX(-45deg);
            transform-origin: top left;
        }
        img {
            display: block; // remove unwanted space on the bottom of the image
        }
    }
    #record {
        border-radius: 50%;
        position: absolute;
        top: 0;
        right: 0;
        width: 250px;
        height: 250px;
        box-shadow: 0px 0px 5px 0px rgba(black, 0.5);
    }
    #trackInfos {
        transition: all 500ms ease;
        box-sizing: border-box;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 1rem;
        background-color: rgba(black, 0.8);
        color: white;
        opacity: 0;

        &:hover {
            opacity: 1;
        }

        .now {
            font-size: 0.8rem;
            color: #7f8c8d;
            margin-bottom: 0.5rem;
        }
        #band {
            text-transform: uppercase;
        }
        #track {
            font-weight: 300;
            color: #bdc3c7;
        }
        #play {
            position: absolute;
            top: calc(50% - 2.5rem);
            left: 0;
            display: block;
            width: 100%;
            height: 5rem;
            line-height: 5rem;
            text-align: center;
            font-size: 5rem;
            color: rgba(white, 0.5);
        }
    }
}
.closed {
    width: 250px;
}
.open {
    width: 350px;
}
.spinning {
    @include animation(turntable 4s linear infinite);
}

@keyframes turntable {
    0% {
        transform: rotateZ(0);
    }
    100% {
        transform: rotateZ(360deg);
    }
}
@-webkit-keyframes turntable {
    0% {
        transform: rotateZ(0);
    }
    100% {
        transform: rotateZ(360deg);
    }
}
@-moz-keyframes turntable {
    0% {
        transform: rotateZ(0);
    }
    100% {
        transform: rotateZ(360deg);
    }
}
@-o-keyframes turntable {
    0% {
        transform: rotateZ(0);
    }
    100% {
        transform: rotateZ(360deg);
    }
`;

export default HomePageWrapper
