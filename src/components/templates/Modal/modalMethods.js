import React from "react"
import ReactDOM from "react-dom"
import Modal from "./Modal"

const body = document.body

export const showInstanceModal = ({ content, onCancel, ...props }) => {
	const container = document.createElement("div")
	body.appendChild(container)

	const unmount = () => {
		ReactDOM.unmountComponentAtNode(container)
		body.removeChild(container)
	}

	const _onCancel = () => {
		if (typeof onCancel === "function") onCancel()
		hide()
	}

	const render = show => {
		ReactDOM.render(
			<Modal show={show} shownByMethod={true} onCancel={_onCancel} onCanceled={unmount} {...props}>
				{content}
			</Modal>,
			container
		)
	}

	const show = () => render(true)

	const hide = () => render(false)

	show()

	return hide
}
