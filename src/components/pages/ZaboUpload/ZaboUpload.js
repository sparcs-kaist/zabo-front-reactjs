import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import ZaboUploadWrapper from "./ZaboUpload.styled"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
	rightIcon: {
		marginLeft: theme.spacing(1),
	},
	input: {
		display: 'none',
	},
	// textField: {
	// 	marginLeft: theme.spacing(1),
	// 	marginRight: theme.spacing(1),
	// },
}));

class ZaboUpload extends PureComponent {
	render() {
		const classes = useStyles();

		return (
			<ZaboUploadWrapper>
				<div id="uploadSection">
					<div id="imageUpload">
						<input
							accept="image/*"
							className={classes.input}
							id="imageUploadInput"
							multiple
							type="file"
						/>
						<label htmlFor="imageUploadInput">
							<Button variant="contained" size="large" color="default" className={classes.button}>
								Upload Image Here
								<CloudUploadIcon className={classes.rightIcon} />
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
							<KeyboardDatePicker
								margin="normal"
								label="Expiration Date"
								// value={selectedDate}
								// onChange={handleDateChange}
							/>
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
