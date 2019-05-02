import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import MasonryWrapper from "./Masonry.styled"
import Bricks from "bricks.js"
import { getEntries } from "../../../lib/api/mock"

import withLog from "hoc/withLog"

const sizes = [
	{ columns: 2, gutter: 10 },
	{ mq: '768px', columns: 3, gutter: 25 },
	{ mq: '1024px', columns: 4, gutter: 50 }
]

document.addEventListener('DOMContentLoaded', event => {
	console.log("DOM Content Loaded ( OUT )")
})

class Masonry extends PureComponent {
	state = { entries: [] }
	instance = null

	componentDidMount() {
		const { mKey } = this.props
		document.addEventListener('DOMContentLoaded', event => {
			console.log("DOM Content Loaded ( IN )")
		})

		this.instance = Bricks({
			container: `#masonry-${mKey || 0}`,
			sizes,
			position: false,
			packed: "packed"
		})

		this.instance
			.on('pack',   () => console.log('ALL grid items packed.'))
			.on('update', () => console.log('NEW grid items packed.'))
			.on('resize', size => console.log('The grid has be re-packed to accommodate a new BREAKPOINT.'))

		this.instance
			.resize(true)
			//.pack()

		getEntries(0, 10).then(res => this.setState({
			entries: res
		}))
	}

	componentDidUpdate(prevProps, prevState) {

	}

	render() {
		const { mKey } = this.props
		const { entries } = this.state

		return (
			<MasonryWrapper id={`masonry-${mKey || 0}`}>
				{entries.map((entry, index) => {
					const { title, image } = entry
					return (
						<div key={index} className="grid-item">
							<img src={image} />
							<h3>{title}</h3>
						</div>
					)
				})}
			</MasonryWrapper>
		)
	}
}

Masonry.propTypes = {
}

Masonry.defaultProps = {
}

export default withLog(Masonry)
