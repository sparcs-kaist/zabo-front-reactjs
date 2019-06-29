import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import ZaboUploadWrapper from "./ZaboUpload.styled"
import InputBase from '@material-ui/core/InputBase';
import DateFnsUtils from '@date-io/date-fns';
import chevron from "../../../static/images/chevron_left.svg";
import add from "../../../static/images/add.svg";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';

class ZaboUpload extends PureComponent {
	constructor(props) {
		super(props);
	}

	state = {
		selectedDate: new Date(),
		tagClicked: [false, false, false, false, false],
	};

	_handleDateChange = (e) => {
		this.setState({ selectedDate: e });
	};

	_handleSubmit = (e) => {
		e.preventDefault();
		console.log("handleSubmit");
		console.log(this.state.selectedDate);
		console.log(e);
		console.log(e.target);
	};

	_onTagClick = (e, i) => {
		console.log(e.target.textContent.slice(1) + ' clicked');
		const modifiedArray = this.state.tagClicked.slice();
		modifiedArray[i] = !modifiedArray[i];
		this.setState({tagClicked: modifiedArray});

		console.log(this.state.tagClicked[i]);
	};

	render() {
		const state = this.state;
		let tag0_className = state.tagClicked[0] ? `tag selected` : `tag default`;
		let tag1_className = state.tagClicked[1] ? `tag selected` : `tag default`;
		let tag2_className = state.tagClicked[2] ? `tag selected` : `tag default`;
		let tag3_className = state.tagClicked[3] ? `tag selected` : `tag default`;
		let tag4_className = state.tagClicked[4] ? `tag selected` : `tag default`;

		return (
			<ZaboUploadWrapper>
				<div id="topline" />
				<div id="header">
					<img src={chevron} alt="chevron_left" />
					<div id="upload_your_poster">
						Upload Your Poster
					</div>
				</div>
				<form onSubmit={this._handleSubmit}>
					<div id="inputs">
						<section id="zabo">
							<div className="label">
								Poster *
							</div>
							<div id="zaboContainer" className="container">
								<img src={add} alt="add zabo" />
							</div>
						</section>
						<div id="zaboInfo">
							<section id="title">
								<div className="label">
									Title *
								</div>
								<InputBase
									required
									className="container"
									placeholder="Please type your poster title"
									multiline />
							</section>
							<section id="explanation">
								<div className="label">
									Explanation *
								</div>
								<InputBase
									required
									className="container"
									placeholder="Please type your poster explanation."
									multiline
									rows="12"
									fullWidth={true} />
							</section>
							<section id="expiration">
								<div className="label">
									Expiration Date *
								</div>
								<div className="container">
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											required
											value={state.selectedDate}
											onChange={this._handleDateChange}
											InputProps={{
												disableUnderline: true,
											}}
											fullWidth={true} />
									</MuiPickersUtilsProvider>
								</div>
							</section>
							<section id="keywords">
								<div className="label">
									Keyword
								</div>
								<div id="tags">
									<div onClick={(e) => this._onTagClick(e,0)} className={tag0_className}>#Advertisement</div>
									<div onClick={(e) => this._onTagClick(e,1)} className={tag1_className}>#Club</div>
									<div onClick={(e) => this._onTagClick(e,2)} className={tag2_className}>#Event</div>
									<div onClick={(e) => this._onTagClick(e,3)} className={tag3_className}>#Recruiting</div>
									<div onClick={(e) => this._onTagClick(e,4)} className={tag4_className}>#Student Council</div>
								</div>
							</section>
						</div>
					</div>
					<div id="submit">
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
