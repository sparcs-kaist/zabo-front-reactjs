import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import { Card } from "./ZaboNode.styled"

import { mockZabos } from "../../templates/ZaboGraph/props"
import { shuffle } from "../../../lib/utils"

const ZaboNode = (props) => {
	console.log('zabo node', { props })
	const { zabo, forward } = props
	const { state } = zabo

	if (state === 'deactivated') {
		return null
	}
	return (
		<Card state={state} onClick={forward}>
			<div to={`/zabo/${zabo._id}`} onClick={() => {
				//updateList(
				//	shuffle(zabos).map((x, i) => {
				//		if (i === 0) return { ...x, state: 'head' }
				//		else return { ...x, state: 'adjacent' }
				//	})
				//)
			}}>
				<Card.Poster
					style={{
						paddingTop: `${zabo.photos[0].height / zabo.photos[0].width * 100}%`,
					}}
					state={state}
				>
					<img
						width="100%"
						src={zabo.photos[0].url}
					/>
				</Card.Poster>
			</div>

			<Card.Writings state={state}>
				<div className="title">
					{zabo.title}
				</div>
				<div className="author">
					<Link to="/zabo/upload">
						{zabo.owner === undefined ? "anonymous" : zabo.owner.name}
					</Link>
				</div>
			</Card.Writings>
		</Card>
	)
	if (state === 'active') {

	}
	if (state === 'head') {

	}
}

ZaboNode.propTypes = {
	state: PropTypes.oneOf(['deactivated', 'adjacent', 'head'])
}
export default ZaboNode
