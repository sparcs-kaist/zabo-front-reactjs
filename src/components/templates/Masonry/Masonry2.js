import React from 'react'
import Bricks from 'bricks.js'
import PropTypes from "prop-types"
import InfiniteScroll from 'react-infinite-scroller'

import Loading from "templates/Loading"

import MasonryWrapper from "./Masonry.styled"

export const GridItem = (props) => {
	const { id, image, title } = props
	return (
		<div key={id} className={"grid-item"}>
			<img src={image} />
			<h3>{title}</h3>
		</div>
	)
}

GridItem.propTypes = {
	id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
}

class ReactBricks extends React.Component {

	instance = null

	initializeBricks = () => {
		const { packed, sizes, useAnimation, containerId } = this.props

		console.log("Initialize ", {
			position: !useAnimation,
			//container: `#${containerId}`,
			container: `.bricks-container`,
			packed,
			sizes,
		})
		this.instance = Bricks({
			position: !useAnimation,
			container: `#${containerId}`,
			packed,
			sizes,
		})

		//setInterval(() => this.instance.update(), 1000)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.reRender) {
			this.resizeBricksLayout()
		}
	}

	componentDidMount() {
		if (this.props.bricks && this.props.bricks.length > 0) {
			this.initializeBricks()
			this.instance.pack()
		}
	}

	resizeBricksLayout = () => {
		this.instance.resize(true)
	}

	componentDidUpdate(prevProps) {
		const { bricks } = this.props
		console.log("update ", prevProps.bricks, bricks)
		if (prevProps.bricks.length === 0) {
			if (bricks.length === 0)
				return
			else {
				this.initializeBricks()
				this.instance.pack()
			}
		} else if (prevProps.bricks.length !== this.props.bricks.length) {
			return this.instance.update()
		}
	}

	packLayout = () => {
		this.instance.pack()
	}
	updateBricksLayout = () => {
		this.instance.update()
	}

	componentWillUnmount() {
		this.instance.resize(false)
	}

	render() {
		const { loadMore, loader, useWindowForScroll, containerId, style, bricks, hasMoreBricks } = this.props

		return (
				<InfiniteScroll className="masonry-class"
												pageStart={0}
												loadMore={loadMore}
												loader={loader}
												hasMore={hasMoreBricks}
												useWindow={useWindowForScroll}>
					<MasonryWrapper className="bricks-container"
									 id={containerId}
									 style={style}>
						{bricks}
					</MasonryWrapper>
				</InfiniteScroll>
		)
	}
}

ReactBricks.propTypes = {
	containerId: PropTypes.string,
	bricks: PropTypes.array,
	hasMoreBricks: PropTypes.bool,
	sizes: PropTypes.array,
	useWindowForScroll: PropTypes.bool,
	reRender: PropTypes.bool,
	loader: PropTypes.func,
	style: PropTypes.object,
	useAnimation: PropTypes.bool,
	loadMore: PropTypes.func
}

ReactBricks.defaultProps = {
	containerId: "bricks-container-app",
	sizes: [
		{ columns: 2, gutter: 20 },
		{ mq: '768px', columns: 3, gutter: 25 },
		{ mq: '1024px', columns: 5, gutter: 40 },
	],
	packed: "data-packed",
	hasMoreBricks: false,
	useWindowForScroll: true,
	style: {},
	useAnimation: true,
	loader: (props) => <Loading {...props} height="25px"/>
}

export default ReactBricks
