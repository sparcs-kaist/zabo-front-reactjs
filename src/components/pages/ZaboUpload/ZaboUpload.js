import React, { PureComponent } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import ReactSwipe from 'react-swipe'
import ReactDOM from 'react-dom'
import InputBase from '@material-ui/core/InputBase'
import DateFnsUtils from '@date-io/date-fns'
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers'

import ZaboUploadWrapper from "./ZaboUpload.styled"

import Chevron_Home from "../../../static/images/chevron_home.svg"
import Chevron_Left from "../../../static/images/chevron_left.svg"
import Chevron_Right from "../../../static/images/chevron_right.svg"
import Delete from "../../../static/images/delete.svg"
import Add from "../../../static/images/add.svg"


class ZaboUpload extends PureComponent {
	addPosters = React.createRef()

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
		posters: [],
		postersPreviewURL: [],
		activeCarouselHeight: 0,
		title: "",
		description: "",
		selectedDate: new Date(),
		tags: [ // TODO: export variables
			{
				tag: "#Recruit",
				clicked: false,
			},
			{
				tag: "#Seminar",
				clicked: false,
			},
			{
				tag: "#Contest",
				clicked: false,
			},
			{
				tag: "#Event",
				clicked: false,
			},
			{
				tag: "#Show",
				clicked: false,
			},
			{
				tag: "#Fair",
				clicked: false,
			},
		],
		percentCompleted: 0,
	}

	_handlePosterAdd = (e) => {
		// preview posters and store them to state
		const posters = e.target.files

		const callback = (postersURLs) => {
			const sorted = postersURLs.sort(function (a, b) {
				return a.index < b.index ? -1 : a.index > b.index ? 1 : 0
			})
			const extracted = sorted.map(item => item.url)

			this.setState(prevState => {
				const newPosters = [...prevState.posters, ...posters]
				const newURLs = [...prevState.postersPreviewURL, ...extracted]
				return {
					posters: newPosters,
					postersPreviewURL: newURLs,
				}
			})
		}

		let count = posters.length
		let postersURLs = []
		for (let i = 0; i < count; i++) {
			const poster = posters[i]
			const reader = new FileReader()

			reader.onloadend = () => {
				postersURLs.push({
					index: i,
					url: reader.result,
				})
				count -= 1
				if (count === 0) callback(postersURLs)
			}
			reader.readAsDataURL(poster)
		}
	}

	_handlePosterDelete = (e) => {
		console.log("handlePosterDelete: ", e.target)
	}

	_handleSwipe = (index, elem) => {
		console.log("parent: ", elem.parentElement)
		console.log("top: ", elem.parentElement.scrollTop)
		this.setState({ activeCarouselHeight: elem.clientHeight })
	}

	_handleChange = ({ target: { name, value } }) => this.setState({ [name]: value })

	_onDateChange = (e) => this.setState({ selectedDate: e })

	_onSubmit = (e) => {
		e.preventDefault()
		let formData = new FormData()
		Array.from(this.state.posters).forEach(file => { // FileList => Array 로
			formData.append("img", file)
		})
		formData.append("title", this.state.title)
		formData.append("description", this.state.description)
		formData.append("endAt", this.state.selectedDate)
		let uploadTags = ""
		this.state.tags.map(tag => {
			if (tag.clicked === true) uploadTags = uploadTags.concat(tag.tag)
		})
		formData.append("category", uploadTags)

		// uploadZabo from this.props
		this.props.uploadZabo(formData, percentCompleted => this.setState({ percentCompleted }))
			.then(res => {
				console.log(res.data)
				this.props.history.push("/")
			})
			.catch(err => {
				console.error(err)
				this.setState({ err, percentCompleted: 0 })
			})
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
		// bug fix: update first activeCarouselHeight
		if ((!!this.state.postersPreviewURL[0] !== false) && (this.state.postersPreviewURL != prevState.postersPreviewURL)) {
			const node = ReactDOM.findDOMNode(this)

			if (node instanceof HTMLElement) {
				const element = node.querySelector(".reactswipe").firstChild.firstChild
				this._handleSwipe(0, element)
			}
		}
	}

	render() {
		const { posters, postersPreviewURL, activeCarouselHeight, tags, selectedDate, percentCompleted, error } = this.state
		const { windowWidth } = this.props
		let reactSwipeEl

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
									!!postersPreviewURL[0] === false ? <div/> :
										<div>
											<img src={Chevron_Left}
													 onClick={() => reactSwipeEl.prev()}
													 alt="carousel left"/>
											<ReactSwipe
												childCount={postersPreviewURL.length}
												className="reactswipe"
												style={{
													container: {
														overflowX: 'hidden',
														overflowY: windowWidth < 800 ? 'hidden' : activeCarouselHeight >= 480 ? 'scroll' : 'hidden',
														visibility: 'hidden',
														position: 'relative',
														margin: '5px 0px',
														height: postersPreviewURL.length === 1 ? 'auto' : activeCarouselHeight,
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
												ref={el => {reactSwipeEl = el}}
												swipeOptions={{
													continuous: false,
													callback: this._handleSwipe, // 이거는 data 변경이 아니라, carousel 의 좌/우 이동할 때!
												}}
											>
												{
													postersPreviewURL.map(url =>
														<div className="swipeItem" key={url}>
															<img
																src={url}
																width="100%"
																className="slick-image"/>
															<img src={Delete}
																	 onClick={this._handlePosterDelete}
																	 className="poster-delete"
																	 alt="delete poster"/>
														</div>,
													)
												}
												{/*{ (() => {reactSwipeEl.swipe.setup()})() }*/}
											</ReactSwipe>
											<img src={Chevron_Right}
													 onClick={() => reactSwipeEl.next()}
													 alt="carousel right"/>
										</div>
								}
							</div>
							<input
								ref={this.addPosters}
								required // 이게 An invalid form control with name='' is not focusable. 에러를 뱉는다.s
								id="posterInput"
								type="file"
								accept="image/*"
								multiple
								onChange={this._handlePosterAdd}/>
							<label htmlFor={posters[0] === undefined ? `posterInput` : ``}
										 className={posters[0] === undefined ? `posterContainer inputContainer` : `posterContainerResponsiveHeight`}>
								{posters[0] === undefined ? <img src={Add} alt="add poster"/> :
									<button onClick={() => { this.addPosters.current.click() }}>Add Posters</button>}
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
											<div key={item.tag}
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
					{error && <div className="error">{error.message}</div>}
					{!!percentCompleted && <div className="loading-bar">
						<div className="loading-active" style={{ width: `${percentCompleted}%` }}></div>
						<div className="loading-inactive"></div>
					</div>}
					{percentCompleted === 100 && "성공"}
					<div className="submit">
						<button onClick={this._onSubmit}>Confirm</button>
						{/* TODO: explicitly warn if any inputs are empty (except keywords) */}
					</div>
				</div>
			</ZaboUploadWrapper>
		)
	}
}

ZaboUpload.propTypes = {}

ZaboUpload.defaultProps = {}

export default ZaboUpload
