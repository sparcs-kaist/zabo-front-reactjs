import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import MasonryZaboList from "react-masonry-infinite"

import ZaboPageWrapper, { Zabo, ZaboCard as Card } from "./ZaboPage.styled"
import { Link } from "react-router-dom"

class ZaboPage extends PureComponent {
	render() {
		return (
			<ZaboPageWrapper>
				<div className="container">
					<Zabo>
						<Zabo.Poster>
							<img
								width="100%"
								src="https://sparcs-kaist-zabo-dev.s3.ap-northeast-2.amazonaws.com/1563636623412"
							/>
						</Zabo.Poster>
						<Zabo.Writings>
							<div className="title">
								SPARCS 2019 Spring Recruiting
							</div>
							<div className="author">
								SPARCS
							</div>
							<hr></hr>
							<div className="description">
								Kristin Bye (Brooklyn, NY & Portland, OR Poster for Obit: “a documentary giving a first-ever glimpse into the daily rituals, joys and existential angst of the NY Times obit writers as they chronicle
							</div>
							<hr></hr>
							<ul className="keyword-result">
								<li>#Club</li>
								<li>#Recruiting</li>
							</ul>
						</Zabo.Writings>
					</Zabo>

				</div>

			</ZaboPageWrapper>
		)
	}
}

ZaboPage.propTypes = {
}

ZaboPage.defaultProps = {
}

export default ZaboPage
