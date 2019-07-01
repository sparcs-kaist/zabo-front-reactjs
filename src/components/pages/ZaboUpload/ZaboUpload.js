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

	_handleDateChange = (e) => {
		this.setState({ selectedDate: e });
	};

	_handleSubmit = (e) => {
		e.preventDefault();
		// console.log(this.state.selectedDate);
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
				<form onSubmit={this._handleSubmit}>
					<div className="inputs">
						<section className="zabo-poster">
							<div className="label">
								Poster *
							</div>
							<div className="posterContainer container">
								<img src={add} alt="add poster" />
							</div>
						</section>
						<div className="info">
							<section className="zabo-title">
								<div className="label">
									Title *
								</div>
								<InputBase
									required
									className="container"
									placeholder="Please type your poster title"
									multiline />
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
									fullWidth={true} />
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
											onChange={this._handleDateChange}
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
										<div onClick={this._onTagClick} className={item.clicked ? `tag selected` : `tag default`}>{item.tag}</div>)}
								</div>
							</section>
						</div>
					</div>
				</form>
				<div className="submit">
					<button type="submit">Sign In</button>
				</div>
			</ZaboUploadWrapper>
		)
	}
}

ZaboUpload.propTypes = {
};

ZaboUpload.defaultProps = {
};

export default ZaboUpload;
