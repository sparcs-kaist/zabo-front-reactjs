import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import MasonryZaboList from "react-masonry-infinite"

import ZaboListWrapper from "./ZaboList.styled"

import ZaboCard from "../../organisms/ZaboCard"
import Feedback from "organisms/Feedback"

import withStackMaster from "./withStackMaster"

const sizes = [
	{ columns: 2, gutter: 10 },
	{ mq: "1000px", columns: 3, gutter: 20 },
	{ mq: "1260px", columns: 4, gutter: 20 },
]

const loader = (
	<div className="loader">
		<span key="1" className="expand">
			Z
		</span>
		<span key="2" className="expand">
			A
		</span>
		<span key="3" className="expand">
			B
		</span>
		<span key="4" className="expand">
			O
		</span>
		<span key="5" className="expand">
			.
		</span>
		<span key="6" className="expand">
			.
		</span>
		<span key="7" className="expand">
			.
		</span>
	</div>
)

class ZaboList extends PureComponent {
	masonry = React.createRef()

	state = { hasNext: true }

	fetch = next => {
		const { type, getZaboList, getPins, relatedTo, zaboList } = this.props
		const lastSeen = next ? (zaboList[zaboList.length - 1] || {})._id : undefined
		const fetches = {
			main: () => getZaboList({ lastSeen }),
			related: () => getZaboList({ lastSeen, relatedTo }),
			pins: () => getPins({ lastSeen }),
		}
		return fetches[type]()
	}

	componentDidMount() {
		this.fetch()
	}

	fetchNext = () => {
		this.fetch(true).then(zaboList => {
			if (zaboList.length === 0) this.setState({ hasNext: false })
		})
	}

	render() {
		const { zaboList } = this.props
		const { hasNext } = this.state
		const { fetchNext } = this

		return (
			<ZaboListWrapper>
				<MasonryZaboList
					className="masonry"
					initialLoad={false}
					hasMore={hasNext}
					loadMore={fetchNext} // called on useWindow (scrollLister)
					loader={loader}
					ref={this.masonry}
					sizes={sizes}
					threshold={800}
				>
					{zaboList.map(zabo => (
						<ZaboCard key={zabo._id} zabo={zabo} />
					))}
				</MasonryZaboList>
				{hasNext || <Feedback />}
			</ZaboListWrapper>
		)
	}
}

ZaboList.propTypes = {
	zaboList: PropTypes.array.isRequired,
}

ZaboList.defaultProps = {}

export default withStackMaster(ZaboList)
