import React, { PureComponent } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import ZaboUploadWrapper from "./ZaboUpload.styled"
import InputBase from '@material-ui/core/InputBase'
import DateFnsUtils from '@date-io/date-fns'
import Chevron_Home from "../../../static/images/chevron_home.svg"
import Chevron_Left from "../../../static/images/chevron_left.svg"
import Chevron_Right from "../../../static/images/chevron_right.svg"
import Delete from "../../../static/images/delete.svg"
import Add from "../../../static/images/add.svg"
import ReactSwipe from 'react-swipe'
import ReactDOM from 'react-dom'
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers'

class ZaboUpload extends PureComponent {
	changePosters = React.createRef();

	/*
	 * state: below are the format of state variables
	 */
	// posters : [ file1, file2, .. ]
	// postersPreviewURL: [
	// 	 {
	// 	 	 index: 0,
	// 	 	 url: file1_url,
	// 	 }
	// ];
	state = {
		posters: null,
		postersPreviewURL: [],
		activeCarouselHeight: 0,
		title: "",
		description: "",
		selectedDate: new Date(),
		tags: [ // TODO: export variables
			{
				tag: "#Advertisement",
				clicked: false,
			},
			{
				tag: "#Club",
				clicked: false,
			},
			{
				tag: "#Event",
				clicked: false,
			},
			{
				tag: "#Recruiting",
				clicked: false,
			},
			{
				tag: "#Student Council",
				clicked: false,
			},
		],
		percentCompleted: 0,
	}

	_onPosterChange = (e) => {
		// preview posters and store them to state
		const posters = e.target.files

		let newURLs = [] // reset URL array
		for (let i = 0; i < posters.length; i++) {
			const poster = posters[i]
			const reader = new FileReader()

			reader.onloadend = () => {
				newURLs.push({
					index: i,
					url: reader.result,
				})

				if (newURLs.length === posters.length) { // ith for-loop might not be the last
					this.setState({
						posters: posters,
						postersPreviewURL: newURLs,
					})
				}
			}
			reader.readAsDataURL(poster)
		}
		// this.setState({ posters: posters }); => NEVER
	}

	_handlePosterDelete = (e) => {
		console.log("handlePosterDelete: ", e.target);
	}

	_handleSwipe = (index, elem) => this.setState({ activeCarouselHeight: elem.clientHeight })

	_handleChange = ({ target: { name, value } }) => this.setState({ [name]: value })

	_onDateChange = (e) => this.setState({ selectedDate: e })

	_onSubmit = (e) => {
		e.preventDefault()
		let formData = new FormData()
		formData.append("img", this.state.posters)
		formData.append("title", this.state.title)
		formData.append("description", this.state.description)
		formData.append("endAt", this.state.selectedDate)
		const uploadTags = []
		this.state.tags.map(tag => {
			if (tag.clicked === true) uploadTags.push(tag.tag)
		})
		formData.append("category", uploadTags)
		// TODO: author

		// uploadZabo from this.props
		this.props.uploadZabo(formData, percentCompleted => this.setState({ percentCompleted }))
			.then((res) => {
				console.log(res.data)
				this.props.history.push("/")
			}) // TODO : Upload 후에 액션
			.catch(error => {
				console.error(error); // TODO : 에러 메시지
				this.setState({ error, percentCompleted: 0 })
			});
	}

	_onTagClick = (e) => {
		// console.log(e.target.textContent + ' clicked')
		const clickedText = e.target.textContent
		this.setState((prevState) => {
			const modifiedArray = prevState.tags.map(item => item.tag === clickedText ? {
				tag: item.tag,
				clicked: !item.clicked,
			} : item)
			return { tags: modifiedArray }
		})
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		// Carousel 이 길고, postersPreviewURL 이 업데이트 되었을 때,
		if ((this.state.postersPreviewURL.length >= 2) && (this.state.postersPreviewURL !== prevState.postersPreviewURL)) {
			const node = ReactDOM.findDOMNode(this)

			if (node instanceof HTMLElement) {
				const childHeight = node.querySelector(".reactswipe").firstChild.firstChild.offsetHeight
				this.setState({ activeCarouselHeight: childHeight })
			}
		}
	}

	render() {
		const { posters, postersPreviewURL, activeCarouselHeight, tags, selectedDate, percentCompleted, error } = this.state
		let reactSwipeEl
		const previews = postersPreviewURL.sort(function (a, b) {
			return a.index < b.index ? -1 : a.index > b.index ? 1 : 0
		})

		return (
			<ZaboUploadWrapper>
				<div className="container">
					<div className="header">
						<Link to="/">
							<img src={Chevron_Home} alt="back to home"/>
						</Link>
						<div className="headerTitle">
							Upload Your Poster
						</div>
					</div>
					<div className="inputs">
						<section className="zabo-poster">
							<div className="label">
								Poster
							</div>
							<div className="posterCarousel">
								{
									posters === null ? <div/> :
										<div>
											<img src={Chevron_Left}
													 onClick={() => reactSwipeEl.prev()}
													 alt="carousel left"/>
											<ReactSwipe
												className="reactswipe"
												style={{
													container: {
														overflowX: 'hidden',
														overflowY: 'scroll',
														visibility: 'hidden',
														position: 'relative',
														margin: '5px 0px',
														height: previews.length === 1 ? 'auto' : activeCarouselHeight,
													},
													wrapper: {
														overflow: 'hidden',
														position: 'relative',
													},
													child: {
														float: 'left',
														width: '100%',
														position: 'relative',
														transitionProperty: 'transform',
													},
												}}
												ref={el => (reactSwipeEl = el)}
												swipeOptions={{
													continuous: false,
													callback: this._handleSwipe,
												}}
											>
												{
													previews.map(preview =>
														<div>
															<img
																src={preview.url}
																width="100%"
																className="slick-image"/>
															<img src={Delete}
																	 onClick={this._handlePosterDelete}
																	 className="poster-delete"
																	 alt="delete poster"/>
														</div>,
													)
												}
											</ReactSwipe>
											{/* TODO: Change Poster 갯수가 적어지면 빈공간.. */}
											<img src={Chevron_Right}
													 onClick={() => reactSwipeEl.next()}
													 alt="carousel right"/>
										</div>
								}
							</div>
							<input
								ref={this.changePosters}
								required // 이게 An invalid form control with name='' is not focusable. 에러를 뱉는다.s
								id="posterInput"
								type="file"
								accept="image/*"
								multiple
								onChange={this._onPosterChange}/>
							<label htmlFor={posters === null ? `posterInput` : ``}
										 className={posters === null ? `posterContainer inputContainer` : `posterContainerResponsiveHeight`}>
								{posters === null ? <img src={Add} alt="add poster"/> :
									<button onClick={() => { this.changePosters.current.click() }}>Change Posters</button>}
							</label>
						</section>
						<div className="info">
							<section className="zabo-title">
								<div className="label">
									Title
								</div>
								<InputBase
									required
									className="inputContainer"
									placeholder="Please type your poster title"
									multiline
									name="title"
									onChange={this._handleChange}/>
							</section>
							<section className="zabo-description">
								<div className="label">
									Description
								</div>
								<InputBase
									required
									className="inputContainer"
									placeholder="Please type your poster description."
									multiline
									rows="12"
									fullWidth={true}
									name="description"
									onChange={this._handleChange}/>
							</section>
							<section className="zabo-expiration">
								<div className="label">
									Expiration Date
								</div>
								<div className="inputContainer">
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											required
											value={selectedDate}
											onChange={this._onDateChange}
											InputProps={{
												disableUnderline: true,
											}}
											fullWidth={true}/>
									</MuiPickersUtilsProvider>
								</div>
							</section>
							<section className="zabo-keywords">
								<div className="label">
									Keyword
								</div>
								<div className="tags">
									{
										tags.map(item =>
											<div
												onKeyDown={e => console.log('key down', e)} // TODO: animate
												onClick={this._onTagClick}
												className={item.clicked ? `tag selected` : `tag default`}>
												{item.tag}
											</div>,
										)
									}
								</div>
							</section>
						</div>
					</div>
					<div className="submit" onClick={this._onSubmit}>
						<button>Confirm</button>
						{/* TODO: explicitly warn if any inputs are empty (except keywords) */}
					</div>
				</div>
				{error && <div className="error">{error.message}</div>}
				{!!percentCompleted && <div className="loading-bar">
					<div className="loading-active" style={{ width: `${percentCompleted}%` }}></div>
					<div className="loading-inactive"></div>
				</div>}
				{percentCompleted === 100 && "성공"}
				<div className="submit" onClick={this._onSubmit}>
					<button>Confirm</button>
				</div>
			</ZaboUploadWrapper>
		)
	}
}

ZaboUpload.propTypes = {}

ZaboUpload.defaultProps = {}

export default ZaboUpload
