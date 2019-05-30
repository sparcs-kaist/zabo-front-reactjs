import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import ZaboUploadWrapper from "./ZaboUpload.styled"
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';

class ZaboUpload extends PureComponent {
	state = {
		selectedDate: new Date('2019-05-30T21:11:54'),
		uploadedImages: [],
	};

	handleDateChange = (e) => {
		console.log(e)
		this.state.selectedDate = e;
		console.log(this.state.selectedDate);
	};

	render() {
		const state = this.state;

		return (
			<ZaboUploadWrapper>
				<div id="uploadSection">
					<div id="imageUpload">
						<input
							accept="image/*"
							id="imageUploadInput"
							multiple
							type="file"
						/>
						<div id="imageUploadText">
							{}
							<CloudUploadIcon />
							Upload Image Here
						</div>
					</div>
					<div id="informationUpload">
						<div id="title">
							<form autoComplete="off">
								<TextField
									required
									label="Title of this Zabo"
									margin="normal"
									fullWidth={true}
								/>
							</form>
						</div>
						<div id="uploader">
							<i class="fas fa-user-circle" />
							SPARCS
						</div>
						<div id="description">
							<TextField
								id="descriptionTextField"
								label="Description"
								multiline
								rows="10"
								margin="normal"
								fullWidth={true}
							/>
						</div>
						<div id="expiration">
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									margin="normal"
									label="Expiration Date"
									value={state.selectedDate}
									onChange={this.handleDateChange}
								/>
							</MuiPickersUtilsProvider>
						</div>
					</div>
				</div>
				<div id="submitSection">
					<Button variant="contained" size="large" color="secondary">
						제출하기
					</Button>
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
