import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import MasonryZaboList from "react-masonry-infinite"

import ZaboListWrapper from "./ZaboList.styled"

import ZaboCard from "../../organisms/ZaboCard"
import Feedback from "organisms/Feedback"

import withStackMaster from "./withStackMaster"

const sizes = [
	{ columns: 2, gutter: 10 },
	...[...Array(68)].map((x, i) => ({
		mq: `${200 + i*10}px`, columns: 2, gutter: 10
	})),
	{ mq: '800px', columns: 3, gutter: 20 },
	{ mq: '1050px', columns: 4, gutter: 20 },
]

const loader = (
	<div className="loader">
		<span className="expand">Z</span>
		<span className="expand">A</span>
		<span className="expand">B</span>
		<span className="expand">O</span>
		<span className="expand">.</span>
		<span className="expand">.</span>
		<span className="expand">.</span>
	</div>
)

class ZaboList extends PureComponent {
	masonry = React.createRef()

	state = { hasNext: true }

	fetch = (next) => {
		const { type, getZaboList, getPins, relatedTo, zaboList } = this.props
		const lastSeen = next ? (zaboList[zaboList.length - 1] || {})._id : undefined
		const fetches = {
			main: () => getZaboList({ lastSeen }),
			related: () => getZaboList({ lastSeen, relatedTo }),
			pins: () => getPins({ lastSeen }),
		}
		return fetches[type]()
	}

	componentDidMount() { this.fetch() }

	fetchNext = () => {
		this.fetch(true)
			.then(zaboList => {
				if (zaboList.length === 0) this.setState({ hasNext: false })
			})
	}

	render() {
		const { zaboList } = this.props
		const { hasNext } = this.state
		const { fetchNext } = this

		return (
			<ZaboListWrapper>
				<div className="container">
					<MasonryZaboList
						className="masonry"
						initialLoad={false}
						sizes={sizes}
						hasMore={hasNext}
						loadMore={fetchNext} // called on useWindow (scrollLister)
						loader={loader}
						ref={this.masonry}
						threshold={800}
					>
						{
							zaboList.map((zabo, i) =>
								<ZaboCard key={zabo._id} zabo={zabo} />
							)
						}
					</MasonryZaboList>
					{hasNext || <Feedback/>}
				</div>
			</ZaboListWrapper>
		)
	}
}

ZaboList.propTypes = {
	zaboList: PropTypes.array.isRequired
}

ZaboList.defaultProps = {
}

export default withStackMaster(ZaboList)
