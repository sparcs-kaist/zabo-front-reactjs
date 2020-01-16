import React, { PureComponent } from 'react';

import appIcon from 'static/logo/sparcs.svg';
import PWAPromptWrapper from './PWAPrompt.styled';


const handleScroll = (e) => {
  if (window.scrollY < 10) {
    document.body.classList.add ('pwa-prompt-active');
  } else {
    document.body.classList.remove ('pwa-prompt-active');
  }
};

class PWAPrompt extends PureComponent {
  state = { active: false };

  addListener = () => {
    this.setState ({ active: true });
    window.addEventListener ('optimizedScroll', handleScroll);
  }

  deleteListener = () => {
    this.setState ({ active: false });
    window.removeEventListener ('optimizedScroll', handleScroll);
  }

  componentDidMount () {
    if (window.pwaPromptActive) {
      this.addListener ();
    } else {
      window.onPWAPromptActive = this.addListener;
    }
  }

  handleOpenClick = () => {
    this.deleteListener ();
    document.body.classList.remove ('pwa-prompt-active');

    window.deferredPrompt.prompt ();
    // Wait for the user to respond to the prompt
    window.deferredPrompt.userChoice.then (choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log ('User accepted the A2HS prompt'); // TODO: Statistics
      } else {
        console.log ('User dismissed the A2HS prompt');
      }
      window.deferredPrompt = null;
    });
  }

  render () {
    const { active } = this.state;
    if (!active) return null;
    return (
      <PWAPromptWrapper className="pwa-prompt">
        <div className="container">
          <img src={appIcon} alt="" className="logo" />
          <div className="texts">
            <div className="title">ZABO (자보) : 모든 포스터를 한 곳에서 모아보세요</div>
            <div className="desc">ZABO 어플리케이션 설치하기 (데스크탑, 안드로이드 ,iOS)</div>
          </div>
          <button onClick={this.handleOpenClick}>설치</button>
        </div>
      </PWAPromptWrapper>
    );
  }
}

PWAPrompt.propTypes = {};

PWAPrompt.defaultProps = {};

export default PWAPrompt;
