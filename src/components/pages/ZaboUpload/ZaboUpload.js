import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import ZaboUploadWrapper from "./ZaboUpload.styled"
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';

class ZaboUpload extends PureComponent {
	constructor(props) {
		super(props);
		this.uploadImages = React.createRef();
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

	render() {
		const state = this.state;

		return (
			<ZaboUploadWrapper>
				<form onSubmit={this._handleSubmit}>
					<div id="uploadSection">
						<div id="imageUpload">
							<input
								accept="image/*"
								id="imageUploadInput"
								multiple
								type="file"
								ref={this.uploadImages}
							/>
							<div id="imageUploadText">
								<CloudUploadIcon />
								Upload Image Here
							</div>
						</div>
						<div id="informationUpload">
							<div id="title">
								<TextField
									required
									autoFocus={true}
									inputStyle={{ fontSize: '200px' }}
									label="Title of this Zabo"
									margin="normal"
									fullWidth={true}
								/>
							</div>
							<div id="uploader">
								<AccountCircle />
								SPARCS
							</div>
							<div id="description">
								<TextField
									required
									id="descriptionTextField"
									label="Description"
									multiline
									rows="12"
									margin="normal"
									fullWidth={true}
								/>
							</div>
							<div id="expiration">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
										required
										margin="normal"
										label="Expiration Date"
										value={state.selectedDate}
										onChange={this._handleDateChange}
									/>
								</MuiPickersUtilsProvider>
							</div>
						</div>
					</div>
					<div id="submitSection">
						<Button type="submit" variant="contained" size="large" color="secondary">
							제출하기
						</Button>
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
