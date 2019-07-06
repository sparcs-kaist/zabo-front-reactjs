import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import ZaboUploadWrapper from "./ZaboUpload.styled"
import InputBase from '@material-ui/core/InputBase';
import DateFnsUtils from '@date-io/date-fns';
import chevron from "../../../static/images/chevron_left.svg";
import add from "../../../static/images/add.svg";
import axios from 'lib/axios';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';

class ZaboUpload extends PureComponent {
	constructor(props) {
		super(props);
		this._onSubmit = this._onSubmit.bind(this);
	}

	state = {
		posters: null,
		title: "",
		explanation: "",
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
		console.log("posters" + e.target.files);
		this.setState({ posters: e.target.files });
	};

	_onTitleChange = (e) => {
		// this.setState({ title: });
	};

	_onExplanationChange = (e) => {
		// this.setState({ explanation: });
	};

	_onDateChange = (e) => {
		this.setState({ selectedDate: e });
	};

	_onSubmit = (e) => {
		e.preventDefault();

		let formData = new FormData();
		formData.append("img", this.state.posters[0]);
		console.log("this.state.posters: ", this.state.posters);
		console.log("this.state.posters[0]: ", this.state.posters[0]);
		// formData.append("title", this.state.title);
		// formData.append("explanation", this.state.explanation);
		// formData.append("expirationDate", this.state.selectedDate);
		// formData.append("keywords",

		console.log("formData: ");
		for (let key of formData.entries()) {
			console.log(key[0] + ', ' + key[1]);
		}

		// axios.post({
		// 	url: "/api/zabo",
		// 	data: {
		// 		zabo: formData,
		// 	},
		// 	headers: {
		// 		'Content-Type': 'multipart/form-data'
		// 	}
		// }).then((res) => res.data);

		axios.post("/zabo/uploadimgtos3", formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then((res) => res.data)
		.catch(error => {
			console.error(error);
		});

		console.log(e.target);
	};

	_onTagClick = (e) => {
		console.log(e.target.textContent + ' clicked');
		const modifiedArray = this.state.tags.map(item => item.tag == e.target.textContent ? { tag: item.tag, clicked: !item.clicked } : item)
		this.setState({tags: modifiedArray});
	};

	render() {
		const state = this.state;

		return (
			<ZaboUploadWrapper>
				<div className="topline" />
				<div className="header">
					<img src={chevron} alt="chevron_left" />
					<div className="upload_your_poster">
						Upload Your Poster
					</div>
				</div>
				<form onSubmit={this._onSubmit} enctype="multipart/form-data">
					<div className="inputs">
						<section className="zabo-poster">
							<div className="label">
								Poster *
							</div>
							<label htmlFor="posterInput" className="posterContainer container">
								<img src={add} alt="add poster" />
							</label>
						</section>
						<input type="file" id="posterInput" multiple onChange={this._onPosterChange} />
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
									onChange={this._onTitleChange} />
							</section>
							<section className="zabo-explanation">
								<div className="label">
									Explanation *
								</div>
								<InputBase
									required
									className="container"
									placeholder="Please type your poster explanation."
									multiline
									rows="12"
									fullWidth={true}
									onChange={this._onExplanationChange} />
							</section>
							<section className="zabo-expiration">
								<div className="label">
									Expiration Date *
								</div>
								<div className="container">
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											required
											value={state.selectedDate}
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
									{state.tags.map(item =>
										<div
											onKeyDown={e => console.log('key down', e)}
											onClick={this._onTagClick} className={item.clicked ? `tag selected` : `tag default`}>{item.tag}</div>)}
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
