import React, { PureComponent } from "react"
import { Link, Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import ReactSwipe from 'react-swipe'
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
import Group from "../../../static/images/group.svg"

class ZaboUpload extends PureComponent {
	addPosters = React.createRef()

	/*
	 * state: below are the format of state variables
	 */
	// posters : [ file1, file2, .. ]
	// postersPreviewURLs: [
	// 	 {
	// 	 	 index: 0,
	// 	 	 url: file1_url,
	// 	 }
	// ];
	state = {
		posters: [],
		postersPreviewURLs: [],
		activeCarouselHeight: 0,
		carouselPos: 0,
		selectedGroup: "",
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

	_handleGroupSelect = (e) => {
		const { value: group } = e.target
		this.setState({
			selectedGroup: group,
		})
	}

	_handlePosterAdd = (windowWidth, e) => {
		// preview posters and store them to state
		const posters = e.target.files
		let firstCarouselHeight

		const callback = (postersURLs) => {
			const sorted = postersURLs.sort((a, b) => {
				return a.index < b.index ? -1 : a.index > b.index ? 1 : 0
			})
			const extracted = sorted.map(item => item.url)

			this.setState(prevState => {
				if (prevState.posters[0] !== undefined)
					firstCarouselHeight = prevState.activeCarouselHeight
				const newPosters = [...prevState.posters, ...posters]
				const newURLs = [...prevState.postersPreviewURLs, ...extracted]
				return {
					posters: newPosters,
					postersPreviewURLs: newURLs,
					activeCarouselHeight: firstCarouselHeight,
				}
			})
		}

		const getImageHeight = (result) => {
			let image = new Image()
			image.src = result
			image.onload = () => {
				if (windowWidth < 800)// on mobile
					firstCarouselHeight = (windowWidth - 50) * image.height / image.width
				else firstCarouselHeight = 320 * image.height / image.width
			}
		}

		let count = posters.length
		let postersURLs = []
		for (let i = 0; i < count; i++) {
			const poster = posters[i]
			const reader = new FileReader()

			reader.onloadend = async () => {
				if (i === 0) await getImageHeight(reader.result)
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

	_handlePosterDelete = () =>
		this.setState(prevState => {
			const i = prevState.carouselPos
			let newPosters = [...prevState.posters] // [... ] 없으면 prevState 와 같은 객체를 참조 => 업뎃 안함.
			let newPostersPreviewURLs = [...prevState.postersPreviewURLs]
			newPosters.splice(i, 1)
			newPostersPreviewURLs.splice(i, 1)
			return {
				posters: newPosters,
				postersPreviewURLs: newPostersPreviewURLs,
			}
		})

	_handleSwipe = (index, elem) => {
		this.setState({
			activeCarouselHeight: elem.clientHeight,
			carouselPos: index,
		})
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
		// TODO: append group => 원래 다른 곳에서 currentGroup 처리.. 하지만 유저 선택 반영.

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

	_onMouseUp = (e) => { // ignore hover when unselecting tag
		const unactiveTag = (elem) => {
			elem.style.color = "#C5C5C5"
			elem.style.backgroundColor = "#F4F4F4"
		}

		const clickedText = e.target.textContent
		this.state.tags.map(item => (item.tag === clickedText && item.clicked === true) ?
			unactiveTag(e.target) : item,
		)
	}

	_onTagClick = (e) => {
		const clickedText = e.target.textContent
		this.setState((prevState) => {
			const modifiedArray = prevState.tags.map(item => item.tag === clickedText ? {
				tag: item.tag,
				clicked: !item.clicked,
			} : item)
			return { tags: modifiedArray }
		})
	}

	render() {
		const { posters, postersPreviewURLs, activeCarouselHeight, tags, selectedDate, percentCompleted, error } = this.state
		const { windowWidth, info } = this.props
		let reactSwipeEl

		if ( !this.props.isAuthenticated ) return <Redirect to="/auth/login"/>
		return (
			<ZaboUploadWrapper>
				<div className="container">
					<div className="header">
						<Link to="/">
							<img src={Chevron_Home} alt="back to home"/>
						</Link>
						<div className="headerLow">
							<div className="headerTitle">
								Upload Your Poster
							</div>
							<div className="zabo-uploader">
								<img src={Group} alt="group"/>
								<select onChange={this._handleGroupSelect}>
									<option value="" hidden>
										Select Your Group
									</option>
									{
										info.groups.map(group =>
											<option value={group.name}>
												{ group.name }
											</option>
										)
									}
									{/*<option value="SPARCS">*/}
									{/*	SPARCS*/}
									{/*</option>*/}
									{/*<option value="Lunatic">*/}
									{/*	Lunatic*/}
									{/*</option>*/}
								</select>
							</div>
						</div>
					</div>
					<div className="inputs">
						<section className="zabo-poster">
							<div className="label">
								Poster
							</div>
							<div className="posterCarousel">
								{
									!!postersPreviewURLs[0] === false ? <div/> :
										<div>
											<img src={Chevron_Left}
													 onClick={() => reactSwipeEl.prev()}
													 alt="carousel left"/>
											<ReactSwipe
												key={postersPreviewURLs.length}
												className="reactswipe"
												style={{
													container: {
														overflowX: 'hidden',
														overflowY: windowWidth < 800 ? 'hidden' : activeCarouselHeight >= 480 ? 'scroll' : 'hidden',
														visibility: 'hidden',
														position: 'relative',
														margin: '5px 0px',
														height: postersPreviewURLs.length === 1 ? 'auto' : activeCarouselHeight,
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
													postersPreviewURLs.map(url =>
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
											</ReactSwipe>
											<img src={Chevron_Right}
													 onClick={() => reactSwipeEl.next()}
													 alt="carousel right"/>
										</div>
								}
								{
									!!postersPreviewURLs[0] === false ? <div/> :
										<div className="carousel-navigations">
											{
												postersPreviewURLs.map((url, index) =>
													<div key={url + index}
															 className={this.state.carouselPos === index ? 'navigation-selected' : 'navigation'}>
													</div>,
												)
											}
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
								onChange={(e) => this._handlePosterAdd(windowWidth, e)}/>
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
													 onMouseUp={this._onMouseUp}
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
