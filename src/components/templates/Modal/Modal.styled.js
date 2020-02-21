import styled from 'styled-components';

const ModalWrapper = styled.div`

font-size: 12px;

  .mask {
    z-index: 9999;
    background: rgba(0,0,0,0.2);
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  .header {
      height: 3px;
      background-color: #143441;
  }
  
  .modal {
    z-index: 9999;
    background: #fff;
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-origin: -50%, -50%;
    width: 240px;
    max-width: calc(100vw - 2rem);
    max-height: calc(100vh - 2rem);
  
    > .title {
      color: #2d3e51;
      text-align: center;
      font-size: 30px;
      &:not(:last-child) {
        margin-bottom: 30px;
      }
    }
  
    > .content {
      margin : 20px;
      overflow: auto;
      color: #9b9b9b;
      text-align: center;
    }
  
    > .footer {
      display: flex;
      justify-content: center;
      margin: 20px 0;
      font-size: 14px;
      color: #143441;
  
      .button {
        min-width: 20px;
        padding: 4.5px 10px;
        border-radius: 3px;
        
        &:hover {
          background-color: #143441;
          color: white;
        }
      }
    }
  
  }
  
  .fade-appear, .fade-enter, .fade-exit {
    animation-duration: .2s;
    animation-fill-mode: both;
    animation-play-state: paused;
    animation-timing-function: linear;
  }
  
  .fade-appear.fade-appear-active,
  .fade-enter.fade-enter-active {
    animation-name: fadeIn;
    animation-play-state: running;
  }
  
  .fade-exit-active {
      animation-name: fadeOut;
      animation-play-state: running;
      pointer-events: none;
  }
  
  .zoom-appear, .zoom-enter, .zoom-exit {
    animation-fill-mode: both;
    animation-play-state: paused;
  }
  
  .zoom-appear, .zoom-enter {
    animation-duration: .2s;
    animation-timing-function: cubic-bezier(.08,.82,.17,1);
    user-select: none;
  }
  
  .zoom-exit {
    animation-duration: .2s;
    animation-timing-function: cubic-bezier(.78,.14,.15,.86);
  }
  
  .zoom-appear.zoom-appear-active,
  .zoom-enter.zoom-enter-active {
    animation-name: zoomIn;
    animation-play-state: running;
  }
  
  .zoom-exit.zoom-exit-active {
    animation-name: zoomOut;
    animation-play-state: running;
    pointer-events: none;
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  
  @keyframes zoomIn {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(.2);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  @keyframes zoomOut {
    0% {
      transform: translate(-50%, -50%) scale(1);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -50%) scale(.2);
    }
  }

`;

export default ModalWrapper;
