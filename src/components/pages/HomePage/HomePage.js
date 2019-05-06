import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import HomePageWrapper, { SCWrapper } from "./HomePage.styled"

import i18n from "lib/i18n"

import koHome from "locales/ko/Home.json"
import enHome from "locales/en/Home.json"

i18n.addResourceBundle("ko", "Home", koHome, true, false)
i18n.addResourceBundle("en", "Home", enHome, true, false)

// SC settings
const clientId = "853fdb79a14a9ed748ec9fe482e859dd"
const trackId = "120912535"

const SC = window.SC
class SCPlayer extends PureComponent {
	state = {
		cover: "",
		band: "",
		song: "",
		isPLayingClass: "closed",
		isSpinningClass: "",
		playerIcon: "ion-ios7-play",
	}

	// Player status
	isPlaying = false

	// Audio Stream
	audioStream = {}

	// Mount component, init SC & get track infos
	componentDidMount() {
		// Init SoundCloud JS SDK
		SC.initialize({
			client_id: this.props.clientId,
		})

		// Getting SC track infos
		SC.get("/tracks/" + this.props.trackId, track => {
			this.setState({
				cover: track.artwork_url.replace("-large", "-crop"),
				band: track.user.username,
				song: track.title,
			})

			// Create audio stream
			this.audioStream = new Audio(track.uri + "/stream?client_id=" + this.props.clientId)
		})
	}

	// Handle play / pause status switch
	togglePlay = () => {
		// play / pause switch
		this.isPlaying = !this.isPlaying

		// handle dynamic css classes
		this.setState({
			isPLayingClass: this.isPlaying ? "open" : "closed",
			isSpinningClass: this.isPlaying ? "spinning" : "",
			playerIcon: this.isPlaying ? "ion-ios7-pause" : "ion-ios7-play",
		})

		// play / pause audio stream
		this.isPlaying ? this.audioStream.play() : this.audioStream.pause()
	}

	render() {
		const { t } = this.props
		return (
			<SCWrapper className={this.state.isPLayingClass}>
				<img
					src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/154694/vinyl.png"
					id="record"
					className={this.state.isSpinningClass}
				/>
				<div id="cover">
					<img src={this.state.cover} width="250" height="250" alt="" id="artwork" />
					<div id="trackInfos">
						<p className="now">NOW PLAYING</p>
						<p id="band">{this.state.band}</p>
						<p id="track">{this.state.song}</p>

						<a
							href="#"
							id="play"
							className={this.state.playerIcon}
							onClick={this.togglePlay}
						/>
					</div>
				</div>
				{t("zabo")}
			</SCWrapper>
		)
	}
}

SCPlayer.propTypes = {
	clientId: PropTypes.string.isRequired,
	trackID: PropTypes.string.isRequired
}

class HomePage extends PureComponent {
	render() {
		return (
			<HomePageWrapper>
				<SCPlayer clientId={clientId} trackId={trackId} />
			</HomePageWrapper>
		)
	}
}

HomePage.propTypes = {}

HomePage.defaultProps = {}

export default (HomePage)
