import React, { PureComponent } from "react"
import { Link } from "react-router-dom" // do not refresh, but render on Link clicked
import MasonryZaboList from "react-masonry-infinite"

import HomePageWrapper, { Header, Zabo } from "./HomePage.styled"

import SearchBar from 'templates/SearchBar'
import SVG from "../../atoms/SVG"

class HomePage extends PureComponent {
	constructor(props) {
		super(props)
		this.masonry = React.createRef()
	}

	state = {
		searchFocused: false,
		hasMoreZabo: true,
	}

	_onSearchFocusBlur = () =>
		this.setState(prevState => {
			return {
				searchFocused: !prevState.searchFocused,
			}
		})

	/*
	 * GET next ZaboList: only called when 'hasMoreZabo === true'
	 */
	getNextZaboList = () => {
		// TODO: zabo 더 남아있는지 체크해서 hasMoreZabo == false 로 바꿔주기
		const currentZaboList = this.props.zaboList
		const lastIdURL = `/zabo/list/next?id=${currentZaboList[currentZaboList.length - 1]._id}`

		this.props.getZaboList(lastIdURL)
			.then(res => {
				console.log(res)
				console.log(res.data)
			})
			.catch(err => {
				console.error(err)
			})
	}

	/*
	 * componentDidMount: 'mount' === render()
	 */
	componentDidMount() {
		// load initial zabo list
		this.props.getZaboList('/zabo/list')
			.then(res => {
				console.log(res)
				console.log(res.data)
			})
			.catch(err => {
				console.error(err)
			})
	}


	render() {
		const { searchFocused } = this.state
		const { zaboList } = this.props
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
		const sizes = [
			{ columns: 2, gutter: 10 },
			{ mq: '780px', columns: 3, gutter: 10 },
			{ mq: '1030px', columns: 4, gutter: 10 },
		]

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
					<MasonryZaboList
						className="masonry"
						initialLoad={false}
						sizes={sizes}
						hasMore={this.state.hasMoreZabo}
						loadMore={this.getNextZaboList} // called on useWindow (scrollLister)
						loader={loader}
						ref={this.masonry}
					>
						{
							zaboList.map((zabo, i) =>
									<Zabo key={i}>
										<Link to="/zabo/upload">
											<Zabo.Poster
												style={{
													paddingTop: `${zabo.photos[0].height / zabo.photos[0].width * 100}%`,
												}}>
												<img
													width="100%"
													src={zabo.photos[0].url}
												/>
											</Zabo.Poster>
										</Link>
										<Zabo.Writings>
											<Link to="/zabo/upload">
												<div className="title">
													{zabo.title}
												</div>
											</Link>
											<Link to="/zabo/upload">
												<div className="author">
													{zabo.description}
													{/* TODO: change to author */}
												</div>
											</Link>
										</Zabo.Writings>
									</Zabo>
								,
							)
						}
					</MasonryZaboList>
				</div>
			</HomePageWrapper>
		)
	}
}

HomePage.propTypes = {}

HomePage.defaultProps = {}

export default HomePage
