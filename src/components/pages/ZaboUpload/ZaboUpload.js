import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import ZaboUploadWrapper from "./ZaboUpload.styled"
import InputBase from '@material-ui/core/InputBase';
import DateFnsUtils from '@date-io/date-fns';
import chevron from "../../../static/images/chevron_left.svg";
import add from "../../../static/images/add.svg";
import Carousel from "react-slick";
// import GridContainer from "../../../../node_modules/material-kit-react/src/components/Grid/GridContainer.jsx";
// import GridItem from "../../../../node_modules/material-kit-react/src/components/Grid/GridItem.jsx";
// import Card from "../../../../node_modules/material-kit-react/src/components/Card/Card.jsx";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';

class ZaboUpload extends PureComponent {
	state = {
		posters: null,
		postersPreviewURL: "",
		title: "",
		description: "",
		selectedDate: new Date(),
		tags: [
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
	};

	_onPosterChange = (e) => {
		// 1 poster only for now
		let reader = new FileReader();
		let poster = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				posters: poster,
				postersPreviewURL: reader.result
			});
		};

		reader.readAsDataURL(poster);
	};

	_handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });
	// (e) => {
	// const { name, value } = e.target;
	// this.setState({ [name]: value });
	// };

	_onDateChange = (e) => this.setState({ selectedDate: e });

	_onSubmit = (e) => {
		e.preventDefault();

		let formData = new FormData();
		formData.append("img", this.state.posters[0]);
		formData.append("title", this.state.title);
		formData.append("description", this.state.description);
		formData.append("expirationDate", this.state.selectedDate);
		const uploadTags = [];
		this.state.tags.map(tag => {
			if (tag.clicked === true) uploadTags.push(tag.tag);
		});
		formData.append("tags", uploadTags);

		// console.log("uploading formData: ");
		// for (let key of formData.entries()) {
		// 	console.log(key[0] + ', ' + key[1]);
		// }

		// uploadZabo from this.props
		this.props.uploadZabo(formData)
		.then((res) => console.log(res.data))
		.catch(error => {
			console.error(error);
		});
	};

	_onTagClick = (e) => {
		console.log(e.target.textContent + ' clicked');
		const clickedText = e.target.textContent;
		this.setState((prevState) => {
			const modifiedArray = prevState.tags.map(item => item.tag === clickedText ? { tag: item.tag, clicked: !item.clicked } : item)
			return { tags: modifiedArray };
		});
	};

	render() {
		const { posters, postersPreviewURL, tags, selectedDate } = this.state;
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
		};

		return (
			<ZaboUploadWrapper>
				<div className="topline" />
				<div className="header">
					<img src={chevron} alt="chevron_left" />
					<div className="upload_your_poster">
						Upload Your Poster
					</div>
				</div>
				<form onSubmit={this._onSubmit}>
					<div className="inputs">
						<section className="zabo-poster">
							<div className="label">
								Poster *
							</div>
							<label htmlFor="posterInput" className={ posters === null ? `posterContainer container` : `posterContainerResponsiveHeight container`} >
								{
									posters === null ? <img src={add} alt="add poster"/> :
									<Carousel {...settings}>
										<div>
											<img
											src={postersPreviewURL}
											width="320"
											className="slick-image" />
										</div>
									</Carousel>
								}
							</label>
						</section>
						<input
							required // 이게 An invalid form control with name='' is not focusable. 에러를 뱉는다.
							id="posterInput"
							type="file"
							multiple
							onChange={this._onPosterChange} />
						<div className="info">
							<section className="zabo-title">
								<div className="label">
									Title *
								</div>
								<InputBase
									required
									className="container"
									placeholder="Please type your poster title"
									multiline
									name="title"
									onChange={this._handleChange} />
							</section>
							<section className="zabo-description">
								<div className="label">
									Description *
								</div>
								<InputBase
									required
									className="container"
									placeholder="Please type your poster description."
									multiline
									rows="12"
									fullWidth={true}
									name="description"
									onChange={this._handleChange} />
							</section>
							<section className="zabo-expiration">
								<div className="label">
									Expiration Date *
								</div>
								<div className="container">
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											required
											value={selectedDate}
											onChange={this._onDateChange}
											InputProps={{
												disableUnderline: true,
											}}
											fullWidth={true} />
									</MuiPickersUtilsProvider>
								</div>
							</section>
							<section className="keywords">
								<div className="label">
									Keyword
								</div>
								<div className="tags">
									{tags.map(item =>
										<div
											onKeyDown={e => console.log('key down', e)}
											onClick={this._onTagClick}
											className={item.clicked ? `tag selected` : `tag default`}>{item.tag}</div>)}
								</div>
							</section>
						</div>
					</div>
					<div className="submit">
						<button type="submit">Sign In</button>
					</div>
				</form>
			</ZaboUploadWrapper>
		)
	}
}

ZaboUpload.propTypes = {
};

ZaboUpload.defaultProps = {
};

export default ZaboUpload;
