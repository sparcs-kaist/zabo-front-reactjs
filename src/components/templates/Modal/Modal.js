import React, { PureComponent } from "react"
import ReactDOM from "react-dom"
import { CSSTransition } from "react-transition-group"

import ModalWrapper from "./Modal.styled"

const body = document.body

class Modal extends PureComponent {
	constructor(props) {
		super(props)
		this.el = document.createElement("div")
		this.state = {
			isHidden: false,
			isLoading: false,
		}
	}

	componentDidMount() {
		body.appendChild(this.el)
	}

	componentWillUnmount() {
		body.removeChild(this.el)
	}

	hide = () => {
		this.setState({
			isHidden: true,
		})
	}

	handleOnExited = () => {
		this.props.onCanceled()
		this.hide()
	}

	handleCancel = () => {
		this.props.onCancel()
	}

	handleSubmit = () => {
		const { onOk, onCancel } = this.props
		const promise = onOk()
		if (promise instanceof Promise) {
			this.setState({ isLoading: true })
			promise.then(() => {
				this.setState({ isLoading: false })
				onCancel()
			})
		} else {
			onCancel()
		}
	}

	renderMask() {
		const { show, mask } = this.props
		if (!mask) return null

		return (
			<CSSTransition
				in={show}
				appear
				timeout={200}
				classNames={{
					appear: "fade-appear",
					appearActive: "fade-appear-active",
					enter: "fade-enter",
					enterActive: "fade-enter-active",
					exit: "fade-exit",
					exitActive: "fade-exit-active",
				}}
			>
				<div
					className={"mask"}
					style={{
						display: this.state.isHidden ? "none" : undefined,
					}}
					onClick={this.handleCancel}
				/>
			</CSSTransition>
		)
	}

	renderFooter() {
		const { cancelText, okText, footer, cancelButton, okButton } = this.props

		if (footer === undefined) {
			return (
				<div className={"footer"}>
					{cancelButton && (
						<div onClick={this.handleCancel} className={"button"}>
							{cancelText}
						</div>
					)}
					{okButton && (
						<div onClick={this.handleSubmit} className={"button"}>
							{okText}
						</div>
					)}
				</div>
			)
		}
		return footer
	}

	renderContent() {
		const { show, title, children } = this.props

		return (
			<CSSTransition
				in={show}
				appear
				timeout={200}
				classNames={{
					appear: "zoom-appear",
					appearActive: "zoom-appear-active",
					enter: "zoom-enter",
					enterActive: "zoom-enter-active",
					exit: "zoom-exit",
					exitActive: "zoom-exit-active",
				}}
				onExited={this.handleOnExited}
			>
				<div
					className={"modal"}
					style={{
						display: this.state.isHidden ? "none" : undefined,
					}}
				>
					<div className="header" />
					{title && (typeof title === "string" ? <div className={"title"}>{title}</div> : title)}
					{children &&
						(typeof children === "string" ? <div className={"content"}>{children}</div> : children)}
					{this.renderFooter()}
				</div>
			</CSSTransition>
		)
	}

	render() {
		return ReactDOM.createPortal(
			<ModalWrapper>
				{this.renderMask()}
				{this.renderContent()}
			</ModalWrapper>,
			this.el
		)
	}
}

Modal.propTyes = {}

Modal.defaultProps = {
	show: true,
	shownByMethod: false,
	title: null,
	footer: undefined,
	closable: true,
	confirmLoading: false,
	mask: true,
	cancelText: null,
	okText: null,
	onCancel: () => {},
	onCanceled: () => {},
	onOk: () => {},
	cancelButton: true,
	okButton: true,
}

export default Modal
