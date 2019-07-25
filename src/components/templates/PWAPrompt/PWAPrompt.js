import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import PWAPromptWrapper from "./PWAPrompt.styled"

import appIcon from "static/logo/sparcs.svg"

const handleScroll = e => {
	if (window.scrollY < 10) {
		document.body.classList.add('pwa-prompt-active')
	} else {
		document.body.classList.remove('pwa-prompt-active')
	}
}

const addListener = () => {
	window.addEventListener("optimizedScroll", handleScroll)
}

const deletelistener = () => {
	window.removeEventListener('optimizedScroll', handleScroll)
}

class PWAPrompt extends PureComponent {
	previousTop = 0

	componentDidMount() {
		if (window.pwaPromptActive) {
			addListener()
		} else {
			window.onPWAPromptActive = addListener
		}
	}

	handleOpenClick = () => {
		deletelistener()
		document.body.classList.remove('pwa-prompt-active')

		window.deferredPrompt.prompt();
		// Wait for the user to respond to the prompt
		window.deferredPrompt.userChoice
			.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
					console.log('User accepted the A2HS prompt');
				} else {
					console.log('User dismissed the A2HS prompt');
				}
				window.deferredPrompt = null;
			});
	}

	render() {
		return (
			<PWAPromptWrapper className="pwa-prompt">
				<div className="container">
						<img src={appIcon} alt="" className="logo"/>
					<div className="texts">
						<div className="title">ZABO (자보) : 모든 포스터를 한 곳에서 모아보세요</div>
						<div className="desc">ZABO 어플리케이션 설치하기</div>
					</div>
					<button onClick={this.handleOpenClick}>설치</button>
				</div>
			</PWAPromptWrapper>
		)
	}
}

PWAPrompt.propTypes = {
}

PWAPrompt.defaultProps = {
}

export default PWAPrompt
