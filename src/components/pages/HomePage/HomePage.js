import React, { PureComponent } from "react"
import { Link } from "react-router-dom" // do not refresh, but render on Link clicked
import MasonryZaboList from "react-masonry-infinite"
import axios from 'lib/axios'

import HomePageWrapper, { Header, Zabo, FeedbackWrapper } from "./HomePage.styled"

import SearchBar from 'templates/SearchBar'
import SVG from "../../atoms/SVG"

class HomePage extends PureComponent {
	constructor(props) {
		super(props)
		this.masonry = React.createRef()
	}

	state = {
		searchFocused: false,
		hasMoreZabo: true,
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
		axios.post('/feedback', { feedback })
			.then(res => {
				console.log(res.data)
				this.setState({
					feedbackSubmitted: true,
					feedback: "",
				})
				setTimeout(() => {
					this.setState({ feedbackSubmitted: false })
				}, 5000)
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
		const { zaboList } = this.props
		const loader = (
			<div className="loader">
				<span className="expand">Z</span>
				<span className="expand">A</span>
				<span className="expand">B</span>
				<span className="expand">O</span>
				<span className="expand">.</span>
				<span className="expand">.</span>
				<span className="expand">.</span>
			</div>
		)
		const sizes = [
			{ columns: 2, gutter: 10 },
			...[...Array(68)].map((x, i) => ({
				mq: `${200 + i * 10}px`, columns: 2, gutter: 10,
			})),
			{ mq: '800px', columns: 3, gutter: 20 },
			{ mq: '1060px', columns: 4, gutter: 20 },
		]

		return (
			<HomePageWrapper className="animated fadeIn">
				<div className="container">
					<Header>
						<div className={`blur animated fadeIn ${searchFocused ? "show" : ""}`}/>
						<Header.Search>
							<SearchBar onFocus={this._onSearchFocusBlur}
												 onBlur={this._onSearchFocusBlur}
												 isOpen={searchFocused}/>
						</Header.Search>
						{
							searchFocused ||
								<Link to="/zabo/upload">
									<Header.AddButton>
										<SVG icon={'plus'} color="white" size="lg"/>
									</Header.AddButton>
								</Link>
						}
					</Header>
					<MasonryZaboList
						className="masonry"
						initialLoad={false}
						sizes={sizes}
						hasMore={this.state.hasMoreZabo}
						loadMore={this.getNextZaboList} // called on useWindow (scrollLister)
						loader={loader}
						ref={this.masonry}
					>
						{
							zaboList.map((zabo, i) =>
									<Zabo key={i}>
										<Link to="/zabo/upload">
											<Zabo.Poster
												style={{
													paddingTop: `${zabo.photos[0].height / zabo.photos[0].width * 100}%`,
												}}>
												<img
													width="100%"
													src={zabo.photos[0].url}
												/>
											</Zabo.Poster>
										</Link>
										<Zabo.Writings>
											<Link to="/zabo/upload">
												<div className="title">
													{zabo.title}
												</div>
											</Link>
											<Link to="/zabo/upload">
												<div className="author">
													{ zabo.owner === undefined ? 'anonymous' : zabo.owner.name }
												</div>
											</Link>
										</Zabo.Writings>
									</Zabo>
								,
							)
						}
					</MasonryZaboList>
					<FeedbackWrapper>
						{
							hasMoreZabo ||
							<FeedbackWrapper.Feedback>
								<div>
									Zabo 는 Open Beta 서비스 입니다. <br/>
									여러분들의 소중한 의견과 함께 발전하는 Zabo 가 되겠습니다.
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
							<div className="thankyou">감사합니다:)</div>
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
