import React, { PureComponent } from "react"
import { Link } from "react-router-dom" // do not refresh, but render on Link clicked

import HomePageWrapper, { Header, FeedbackWrapper } from "./HomePage.styled"

import SearchBar from 'templates/SearchBar'
import ZaboList from "templates/ZaboList"
import SVG from "../../atoms/SVG"

class HomePage extends PureComponent {
	state = {
		searchFocused: false,
		hasMoreZabo: false,
		feedback: "",
		feedbackSubmitted: false,
	}

	_onSearchFocusBlur = () =>
		this.setState(prevState => {
			return {
				searchFocused: !prevState.searchFocused,
			}
		})

	/*
	 * GET next ZaboList: only called when 'hasMoreZabo === true'
	 */
	getNextZaboList = () => {
		const currentZaboList = this.props.zaboList
		const lastIdURL = `/zabo/list/next?id=${currentZaboList[currentZaboList.length - 1]._id}`

		this.props.getZaboList(lastIdURL)
			.then(zaboList => {
				if (zaboList.length === 0) this.setState({ hasMoreZabo: false })
			})
			.catch(err => {
				console.error(err)
			})
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

	/*
	 * componentDidMount: 'mount' === render()
	 */
	componentDidMount() {
		// load initial zabo list
		this.props.getZaboList('/zabo/list')
			.catch(err => {
				console.error(err)
			})
	}

	render() {
		const { searchFocused, hasMoreZabo, feedbackSubmitted } = this.state
		const { zaboList, zaboId } = this.props

		return (
			<HomePageWrapper className="animated fadeIn">
				<div className="container">
					<Header>
						<div className={`blur animated fadeIn ${searchFocused ? "show" : ""}`}/>
						<Header.Search>
							<SearchBar
								onFocus={this._onSearchFocusBlur}
								onBlur={this._onSearchFocusBlur}
								isOpen={searchFocused}/>
						</Header.Search>
						{searchFocused ||
						<Link to="/zabo/upload">
							<Header.AddButton>
								<SVG icon={'plus'} color="white" size="lg"/>
							</Header.AddButton>
						</Link>
						}
					</Header>

					<ZaboList
						hasMoreZabo={this.state.hasMoreZabo}
						getNextZaboList={this.getNextZaboList}
						zaboList={zaboList}
						zaboId={zaboId}
					/>
					<FeedbackWrapper>
						{
							hasMoreZabo ||
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
						}
						{
							feedbackSubmitted &&
								<div>감사합니다</div>
						}
					</FeedbackWrapper>
				</div>
			</HomePageWrapper>
		)
	}
}

HomePage.propTypes = {}

HomePage.defaultProps = {}

export default HomePage
