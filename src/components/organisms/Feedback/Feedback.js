import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import axios from "lib/axios"

import FeedbackWrapper from "./Feedback.styled"

class Feedback extends PureComponent {
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

	_handleFeedbackSubmit = () => {
		const { feedback } = this.state
		axios.post('/feedback', feedback)
			.then(res => {
				console.log(res.data)
				this.setState({
					feedbackSubmitted: true
				})
				setTimeout(() => {this.setState({
					feedbackSubmitted: false
				})}, 5000)
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
							{/*{*/}
							{/*	windowWidth >= 800 &&*/}
							{/*	<span>*/}
							{/*		<br/> 생각나시는 점이 있다면, 꼭 참여부탁드립니다.*/}
							{/*	</span>*/}
							{/*}*/}
						</div>
						<div>
							<input placeholder={'Please leave a comment for the service'}
										 onChange={this._onFeedbackChange}/>
							<button onClick={this._handleFeedbackSubmit}>
								Send
							</button>
						</div>
					</FeedbackWrapper.Feedback>
				{
					feedbackSubmitted &&
					<div>감사합니다</div>
				}
			</FeedbackWrapper>
		)
	}
}

Feedback.propTypes = {
}

Feedback.defaultProps = {
}

export default Feedback
