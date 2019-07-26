import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import MasonryZaboList from "react-masonry-infinite"

import ZaboListWrapper from "./ZaboList.styled"

import ZaboPage from "../../pages/ZaboPage"

import withStackMaster from "./withStackMaster"

import { ZaboCard } from "../../pages/ZaboPage/ZaboPage"

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

	render() {
		const { hasMoreZabo, getNextZaboList, zaboList } = this.props

		return (
			<ZaboListWrapper>
				<MasonryZaboList
					className="masonry"
					initialLoad={false}
					sizes={sizes}
					hasMore={hasMoreZabo}
					loadMore={getNextZaboList} // called on useWindow (scrollLister)
					loader={loader}
					ref={this.masonry}
				>
					{
						zaboList.map((zabo, i) =>
							<ZaboCard key={zabo._id} zabo={zabo} />
						)
					}
				</MasonryZaboList>
			</ZaboListWrapper>
		)
	}
}

ZaboList.propTypes = {
	hasMoreZabo: PropTypes.bool.isRequired,
	getNextZaboList: PropTypes.func.isRequired,
	zaboList: PropTypes.array.isRequired
}

ZaboList.defaultProps = {
}

export default withStackMaster(ZaboList)
