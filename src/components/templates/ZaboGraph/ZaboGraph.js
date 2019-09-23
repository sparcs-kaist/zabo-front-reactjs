import React, { useRef, useState, useEffect, useCallback, createRef } from "react"
import styled from "styled-components"
import MasonryZaboList from "react-masonry-infinite"
import ZaboNode from "../../organisms/ZaboNode"

import { shuffle } from "../../../lib/utils"
import { mockZabos } from "./props"

const sizes = [
	{ columns: 2, gutter: 10 },
	...[...Array(68)].map((x, i) => ({
		mq: `${200 + i * 10}px`, columns: 2, gutter: 10,
	})),
	{ mq: "800px", columns: 3, gutter: 20 },
	{ mq: "1050px", columns: 4, gutter: 20 },
]

const loader = (
	<div className="loader">
		<span key="1" className="expand">Z</span>
		<span key="2" className="expand">A</span>
		<span key="3" className="expand">B</span>
		<span key="4" className="expand">O</span>
		<span key="5" className="expand">.</span>
		<span key="6" className="expand">.</span>
		<span key="7" className="expand">.</span>
	</div>
)

/* Get head's related zabo, If head is not given, fetch main */
const getRelatedZabos = (_id) => {
	const shuffled = shuffle(mockZabos)
	return shuffled.filter(x => x._id !== _id)
}

const Style = styled.div`
	
`

const Head = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`


//const ZaboGraph = (props) => {
//	const { head } = props
//	const masonry = useRef(null);
//
//	const [zaboList, updateZaboList] = useState([])
//	useEffect(() => {
//		console.log('effect')
//		if (!head) updateZaboList(getRelatedZabos().map(x => ({ ...x, state: 'adjacent' })))
//		else if (head.state === 'head') {
//			const zabos = getRelatedZabos(head._id)
//			updateZaboList(zabos.map(x => ({ ...x, state: 'adjacent' })))
//		}
//		else if (head.state === 'adjacent') {
//			updateZaboList(zaboList.map(x => ({ ...x, state: 'deactivated' })))
//		}
//	}, [head])
//
//	const givenForward = useCallback(() => {
//		props.forward(head._id)
//	}, [])
//
//	const givenBack = useCallback(() => {
//		props.back()
//	}, [])
//
//	const deactivate = useCallback(_id => {
//		for (let item in zaboList) {
//			if (item._id === _id) {
//				item.state = 'deactivated'
//			}
//		}
//		updateZaboList(zaboList)
//	}, [])
//
//	const forward = useCallback(_id => {
//		// deactivate head
//		props.deactivate(head._id)
//		// deactivate children
//		const updated = zaboList.map(x => ({ ...x, state: 'deactivated' }))
//		// activate the child
//		for (let item in updated) {
//			if (item._id === _id) {
//				item.state = 'head'
//			}
//		}
//		updateZaboList(updated)
//	}, [])
//
//	const back = useCallback(() => {
//		props.forward(head._id);
//	}, [])
//
//	console.log("Zabo Graph Render")
//	if (head && head.state === 'deactivated') return null;
//	if (!zaboList.length) {
//		return loader
//	}
//	console.log("actually rendering")
//
//	return (
//		<Style>
//			{head.state === 'head' && <button onClick={givenBack}>Go Back</button>}
//			{head && <ZaboNode key={head._id} zabo={head} forward={givenForward} />}
//			<MasonryZaboList
//				className="masonry"
//				initialLoad={false}
//				sizes={sizes}
//				hasMore={false}
//				loadMore={() => {}} // called on useWindow (scrollLister)
//				loader={loader}
//				ref={masonry}
//				threshold={800}
//			>
//				{
//					zaboList.map(zabo =>
//						<ZaboGraph key={zabo._id} head={zabo} forward={forward} back={back} deactivate={deactivate}/>,
//					)
//				}
//			</MasonryZaboList>
//		</Style>
//	)
//}


class Classed extends React.Component {
	masonry = createRef();
	state = { zaboList: [] }

	updateZaboList = x => this.setState({ zaboList: x })

	update = () => {
		const { head } = this.props
		const { updateZaboList } = this
		const { zaboList } = this.state

		console.log('effect')
		if (!head) updateZaboList(getRelatedZabos().map(x => ({ ...x, state: 'adjacent' })))
		else if (head.state === 'head') {
			const zabos = getRelatedZabos(head._id)
			updateZaboList(zabos.map(x => ({ ...x, state: 'adjacent' })))
		}
		else if (head.state === 'adjacent') {
			updateZaboList(zaboList.map(x => ({ ...x, state: 'deactivated' })))
		}
	}
	componentDidMount() {
		this.update()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.head.state !== this.props.head.state) this.update();
	}

	render() {
		const { props, updateZaboList } = this
		const { head } = props
		const { zaboList } = this.state

		const givenForward = () => { props.forward(head._id) }

		const givenBack = () => {
			props.back()
		}

		const deactivate = _id => {
			for (let item in zaboList) {
				if (item._id === _id) {
					item.state = 'deactivated'
				}
			}
			updateZaboList(zaboList)
		}

		const forward = _id => {
			// deactivate head
			props.deactivate(head._id)
			// deactivate children
			const updated = zaboList.map(x => ({ ...x, state: 'deactivated' }))
			// activate the child
			for (let item in updated) {
				if (item._id === _id) {
					item.state = 'head'
				}
			}
			updateZaboList(updated)
		}

		const back = () => {
			props.forward(head._id);
		}

		console.log("Zabo Graph Render")
		if (head && head.state === 'deactivated') return null;
		if (!zaboList.length) {
			return loader
		}
		console.log("actually rendering")

		return (
			<Style>
				{head.state === 'head' && <button onClick={givenBack}>Go Back</button>}
				{/*{head && <ZaboNode key={head._id} zabo={head} forward={givenForward} />}*/}
				{head && <div zabo={head} forward={givenForward} >{head._id}</div>}
				{
					zaboList.map(zabo =>
						<Classed key={zabo._id} head={zabo} forward={forward} back={back} deactivate={deactivate}/>,
					)
				}
			</Style>
		)
	}
}

export default Classed;
