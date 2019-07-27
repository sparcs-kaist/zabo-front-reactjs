import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import MasonryZaboList from "react-masonry-infinite"

import ZaboPageWrapper, { Zabo, ZaboCard as Card } from "./ZaboPage.styled"
import { Link } from "react-router-dom"
import ZaboList from "templates/ZaboList"

class ZaboPage extends PureComponent {
	render() {
		const { zabo = {}, zaboId } = this.props
		const { title, author, description, category = [], photos=[{}] } = zabo

		return (
			<ZaboPageWrapper>
				<div className="container">
					<Zabo>
						<Zabo.Poster>
							<img
								width="100%"
								src={photos[0].url}
							/>
						</Zabo.Poster>
						<Zabo.Writings>
							<div className="title">
								{title}
							</div>
							<div className="author">
								{author}
							</div>
							<hr></hr>
							<div className="description">
								{description}
							</div>
							<hr></hr>
							<ul className="keyword-result">
								{category.map(cat =>
									<li key={cat}>#{cat}</li>
								)}
							</ul>
						</Zabo.Writings>
					</Zabo>
				</div>
				<ZaboList type="related" relatedTo={zaboId} />
			</ZaboPageWrapper>
		)
	}
}

ZaboPage.propTypes = {
}

ZaboPage.defaultProps = {
}

export default ZaboPage
