import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import MasonryZaboList from "react-masonry-infinite"

import ZaboPageWrapper, { Zabo, ZaboCard as StyledZaboCard } from "./ZaboPage.styled"
import { Link } from "react-router-dom"

export const ZaboCard = (props) => {
	const { zabo } = props
	return (
		<StyledZaboCard>
			<Link to={`/zabo/${zabo._id}`}>
				<StyledZaboCard.Poster
					style={{
						paddingTop: `${zabo.photos[0].height / zabo.photos[0].width * 100}%`,
					}}>
					<img
						width="100%"
						src={zabo.photos[0].url}
					/>
				</StyledZaboCard.Poster>
			</Link>
			<StyledZaboCard.Writings>
				<Link to={`/zabo/${zabo._id}`}>
					<div className="title">
						{zabo.title}
					</div>
				</Link>
				<Link to="/zabo/upload">
					<div className="author">
						{zabo.description}
						{/* TODO: change to author */}
					</div>
				</Link>
			</StyledZaboCard.Writings>
		</StyledZaboCard>
	)
}

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
