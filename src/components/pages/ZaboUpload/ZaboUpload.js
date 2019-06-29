import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import ZaboUploadWrapper from "./ZaboUpload.styled"
import Button from '@material-ui/core/Button';
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

	_onTagClick = (e) => {
		console.log(e.target.textContent.slice(1));

	};

	render() {
		const state = this.state;

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
									placeholder="Please type your poster explanation"
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
											fullWidth={true} />
									</MuiPickersUtilsProvider>
								</div>
							</section>
							<section id="keywords">
								<div className="label">
									Keyword
								</div>
								<div id="tags">
									<div onClick={this._onTagClick} className="tag">#Advertisement</div>
									<div onClick={this._onTagClick} className="tag">#Club</div>
									<div onClick={this._onTagClick} className="tag">#Event</div>
									<div onClick={this._onTagClick} className="tag">#Recruiting</div>
									<div onClick={this._onTagClick} className="tag">#Student Council</div>
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
