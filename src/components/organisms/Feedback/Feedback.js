import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import axios from "lib/axios"

import FeedbackWrapper from "./Feedback.styled"

class Feedback extends PureComponent {
	input = React.createRef()

	state = {
		feedback: "",
		feedbackSubmitted: false,
	}

	_onFeedbackChange = (e) => {
		const { value } = e.target
		this.setState({
			feedback: value,
		})
	}

	_handleKeyDown = (e) => {
		if (e.key === 'Enter')
			this._handleFeedbackSubmit()
	}


	_handleFeedbackSubmit = () => {
		const { feedback } = this.state
		axios.post('/feedback', feedback)
			.then(res => {
				this.setState({
					feedbackSubmitted: true,
					feedback: "",
				})
				this.input.current.value = ""
				setTimeout(() => {
					this.setState({
						feedbackSubmitted: false,
					})
				}, 5000)
			})
			.catch(err => {
				console.error(err)
			})
	}

	render() {
		const { feedbackSubmitted } = this.state

		return (
			<FeedbackWrapper>
				<FeedbackWrapper.Feedback>
					<div>
						Zabo 는 Open Beta 서비스 입니다. <br/>
						여러분들의 소중한 의견과 함께 발전하는 Zabo 가 되겠습니다.
					</div>
					<div>
						<input placeholder={'Please leave a comment for the service'}
									 onKeyDown={this._handleKeyDown}
									 onChange={this._onFeedbackChange}
									 ref={this.input}/>
						<button onClick={this._handleFeedbackSubmit}>
							Send
						</button>
					</div>
				</FeedbackWrapper.Feedback>
				{
					feedbackSubmitted &&
					<div className="thankyou">감사합니다:)</div>
				}
			</FeedbackWrapper>
		)
	}
}

Feedback.propTypes = {}

Feedback.defaultProps = {}

export default Feedback
