import React, { PureComponent } from "react"

import MainPageWrapper from "./MainPage.styled"

import Masonry, { GridItem } from "templates/Masonry"

import { getEntries } from "../../../lib/api/mock"
import Test from "../../templates/Test"
import ReactBricks from "../../templates/Test/ReactBricks"

class MainPage extends PureComponent {
	state = {
		entries: [],
		page: 1
	}

	componentDidMount() {
		getEntries(0, 10).then(res => this.setState({
			entries: res
		}))
	}

	loadMore = (page) => {
		getEntries(page, 10)
			.then(res => this.setState(prev => {
				return { entries: prev.entries.concat(res), page }
			}))
	}

	render() {
		const { entries } = this.state

		const bricks = entries.map((entry, index) => {
			const { title, image } = entry
			return (
				<GridItem title={title} image={image} id={index}/>
			)
		})

		return (
			<MainPageWrapper>
				<Masonry
					bricks={bricks}
					useAnimation={false}
					loadMore={this.loadMore}
					hasMoreBricks={true}
				/>
			</MainPageWrapper>
		)
	}
}

MainPage.propTypes = {}

MainPage.defaultProps = {}

export default MainPage
