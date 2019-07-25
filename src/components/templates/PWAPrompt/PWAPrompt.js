import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import PWAPromptWrapper from "./PWAPrompt.styled"

const addListener = () => {
	window.addEventListener("optimizedScroll", a => {
		if (window.scrollY < 10) {
			document.body.classList.add('pwa-prompt-active')
		} else {
			document.body.classList.remove('pwa-prompt-active')
		}
	})
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

	render() {
		return (
			<PWAPromptWrapper className="pwa-prompt">
				PWAPrompt
			</PWAPromptWrapper>
		)
	}
}

PWAPrompt.propTypes = {
}

PWAPrompt.defaultProps = {
}

export default PWAPrompt
