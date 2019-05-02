import React, { PureComponent } from "react"
import ReactBricks from "./ReactBricks"
import Tile from "./Tile"

class Test extends PureComponent {
	constructor(props) {
		super(props)
		this.colors = ['#EC407A', '#EF5350', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#29B6F6', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#827717', '#EF6C00']
		this.heights = [150, 250, 200, 350, 400, 450]
		this.elements = this.generateElements()
		this.state = {
			bricks: this.getBricks(),
			reRender: false,
		}
		window.onresize = () => {
			this.setState({ reRender: true })
		}
		this.defaultLoaderStyle = {
			spinnerSize: 64,
		}

	}

	componentWillReceiveProps(nextProps) {
		this.setState({ bricks: this.getBricks() })
	}

	getRandomElement = (array) => {
		return array[Math.floor(Math.random() * array.length)]
	}
	generateElements = () => [...Array(10).keys()].map((x, i) => ({
		key: Math.floor(i * Math.random() * 10000),
		color: this.getRandomElement(this.colors),
		height: this.getRandomElement(this.heights),
	}))
	loadMore = () => {
		this.elements = this.elements.concat(this.generateElements())

		setTimeout(() => {
			console.log("inside setTimeout")
			this.setState({ bricks: this.getBricks() })
		}, 2500)
	}
	getBricks = () => {
		let results = null
		results = this.elements.map(({ key, color, height }, i) => {
			return (
				<Tile key={key}
							className="card"
							style={{
								background: color,
								height: height,
							}}
							data={i}/>
			)
		})
		return results
	}

	render() {
		return (
			<div className="app">
				<ReactBricks
					containerId={"bricks-container-app"}
					loadMoreBricks={this.loadMore}
					ref={(ref) => this.reactBricks = ref}
					hasMoreBricks={true}
					reRender={this.state.reRender}
					bricks={this.state.bricks}
					defaultLoaderStyle={this.defaultLoaderStyle}
				/>
			</div>
		)
	}
}

Test.propTypes = {}

Test.defaultProps = {}

export default Test
