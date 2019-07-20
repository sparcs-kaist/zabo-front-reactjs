import React, { PureComponent } from "react"
import { Link } from "react-router-dom" // do not refresh, but render on Link clicked
import MasonryInfiniteScroller from "react-masonry-infinite"

import HomePageWrapper, { Header, Zabo, ZaboList } from "./HomePage.styled"
import SearchBar from 'templates/SearchBar'
import SVG from "../../atoms/SVG"
import axios from "../../../lib/axios"

class HomePage extends PureComponent {
	constructor(props) {
		super(props)
		this.masonry = React.createRef()
	}

	state = {
		searchFocused: false,
		zaboList: [],
		hasMoreZabo: true, // initial true
	}

	_onSearchFocusBlur = (e) =>
		this.setState(prevState => {
			return {
				searchFocused: !prevState.searchFocused,
			}
		})

	/*
	 * GET ZaboList:  @param - 0 for initial, 1 for next
	 */
	getZaboList = (call) => {
		// Redux 로 만들기

		let url = "/zabo/list"
		if (call === 1) { // call for next
			const currentZaboList = this.state.zaboList
			const lastId = `/next?id=${currentZaboList[currentZaboList.length - 1]._id}`
			url += lastId
		}

		axios.get(url)
			.then(res => {
				// filter no longer needed, if all zabo MUST acquire photos
				const zaboWithPhotos = res.data.filter(item => item.photos[0] !== undefined)
				this.setState(prevState => {
					const newZaboList = prevState.zaboList.concat(zaboWithPhotos)
					return {
						zaboList: newZaboList,
					}
				})
			})
			.catch(err => {
				console.log(err)
			})
	}

	/*
	 * GET next ZaboList: only called when 'hasMoreZabo === true'
	 */
	getNextZaboList = () => {
		this.getZaboList(1)
		// +) zabo 더 남아있는지 체크해서 hasMoreZabo == false 로 바꿔주기
	}

	/*
	 * componentDidMount: 'mount' === render() component
	 */
	componentDidMount() {
		// load initial zabo list
		this.getZaboList(0)
	}

	render() {
		const { zaboList, searchFocused } = this.state
		const loader = (<div>Loading ...</div>)

		return (
			<HomePageWrapper className="animated fadeIn">
				<div className="container">
					<Header>
						<div className={`blur animated fadeIn ${searchFocused ? "show" : ""}`}/>
						<Header.Search>
							<SearchBar
								onFocus={this._onSearchFocusBlur}
								onBlur={this._onSearchFocusBlur}
								isOpen={searchFocused}/>
						</Header.Search>
						{searchFocused ||
						<Link to="/zabo/upload">
							<Header.AddButton>
								<SVG icon={'plus'} color="white" size="lg"/>
							</Header.AddButton>
						</Link>
						}
					</Header>
					<MasonryInfiniteScroller
						className="masonry"
						initialLoad={false}
						hasMore={this.state.hasMoreZabo}
						loadMore={this.getNextZaboList} // called on useWindow (scrollLister)
						loader={loader}
						ref={this.masonry}
					>
						{
							zaboList.map((zabo, i) =>
								<Zabo key={i}>
									<Zabo.Poster
										style={{
											paddingTop: `${zabo.photos[0].height / zabo.photos[0].width * 100}%`,
										}}>
										<img
											width="100%"
											src={zabo.photos[0].url}
										/>
									</Zabo.Poster>
									<Zabo.Writings>
										<Zabo.Writings.Title>
											{zabo.title}
										</Zabo.Writings.Title>
										<Zabo.Writings.Author>
											{zabo.description}
										</Zabo.Writings.Author>
									</Zabo.Writings>
								</Zabo>,
							)
						}
					</MasonryInfiniteScroller>
				</div>
			</HomePageWrapper>
		)
	}
}

HomePage.propTypes = {}

HomePage.defaultProps = {}

export default HomePage
