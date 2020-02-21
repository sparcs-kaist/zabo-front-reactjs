import React from 'react';
import styled from 'styled-components';

const Style = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  background-color: rgba(29,31,32, 0.5);
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  .loader  {
    position: fixed;
    left: 50%;
    top: 50%;
    animation: rotate 1s infinite;  
    height: 50px;
    width: 50px;
  }
  
  .loader:before,
  .loader:after {   
    border-radius: 50%;
    content: '';
    display: block;
    height: 20px;  
    width: 20px;
  }
  .loader:before {
    animation: ball1 1s infinite;  
    background-color: #cb2025;
    box-shadow: 30px 0 0 #f8b334;
    margin-bottom: 10px;
  }
  .loader:after {
    animation: ball2 1s infinite; 
    background-color: #00a096;
    box-shadow: 30px 0 0 #97bf0d;
  }
  
  @keyframes rotate {
    0% { 
      transform: rotate(0deg) scale(0.8); 
    }
    50% { 
      transform: rotate(360deg) scale(1.2); 
    }
    100% { 
      transform: rotate(720deg) scale(0.8); 
    }
  }
  
  @keyframes ball1 {
    0% {
      box-shadow: 30px 0 0 #f8b334;
    }
    50% {
      box-shadow: 0 0 0 #f8b334;
      margin-bottom: 0;
      transform: translate(15px,15px);
    }
    100% {
      box-shadow: 30px 0 0 #f8b334;
      margin-bottom: 10px;
    }
  }
  
  @keyframes ball2 {
    0% {
      box-shadow: 30px 0 0 #97bf0d;
    }
    50% {
      box-shadow: 0 0 0 #97bf0d;
      margin-top: -20px;
      transform: translate(15px,15px);
    }
    100% {
      box-shadow: 30px 0 0 #97bf0d;
      margin-top: 0;
    }
  }
`;

const Loading = () => (
  <Style>
    <div className="loader" />
  </Style>
);

export default Loading;
