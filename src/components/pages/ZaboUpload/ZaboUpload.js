import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import ZaboUploadWrapper from "./ZaboUpload.styled"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';

class ZaboUpload extends PureComponent {
	render() {
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
						<label htmlFor="imageUploadInput">
							<Button variant="contained" size="large" color="default" className="spacing">
								Upload Image Here
								<CloudUploadIcon className="spacing"/>
							</Button>
						</label>
					</div>
					<div id="informationUpload">
						<div id="title">
							<form autoComplete="off">
								<TextField
									required
									label="Title of this Zabo"
									margin="normal"
								/>
							</form>
						</div>
						<div id="uploader">
							<i class="fas fa-user-circle" />
							SPARCS
						</div>
						<div id="description">
							<TextField
								// id="afsd"
								label="Description"
								multiline
								// rowsMax="4"
								// value={values.multiline}
								// onChange={handleChange('multiline')}
								margin="normal"
							/>
						</div>
						<div id="expiration">
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									margin="normal"
									label="Expiration Date"
									// value={selectedDate}
									// onChange={handleDateChange}
								/>
							</MuiPickersUtilsProvider>
						</div>
					</div>
				</div>
				<div id="submitSection">
					<Button color="secondary">
						제출하기
					</Button>
				</div>
			</ZaboUploadWrapper>
		)
	}
}

ZaboUpload.propTypes = {
}

ZaboUpload.defaultProps = {
}

export default ZaboUpload;
