import React, { PureComponent } from "react"
import { Link } from "react-router-dom" // do not refresh, but render on Link clicked
import MasonryZaboList from "react-masonry-infinite"

import HomePageWrapper, { Header, Zabo, Feedback } from "./HomePage.styled"

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
		const currentZaboList = this.props.zaboList
		const lastIdURL = `/zabo/list/next?id=${currentZaboList[currentZaboList.length - 1]._id}`

		this.props.getZaboList(lastIdURL)
			.then(zaboList => {
				if (zaboList.length === 0) this.setState({ hasMoreZabo: false })
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
			.catch(err => {
				console.error(err)
			})
	}

	render() {
		const { searchFocused, hasMoreZabo } = this.state
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
			...[...Array(68)].map((x, i) => ({
				mq: `${200 + i*10}px`, columns: 2, gutter: 10
			})),
			{ mq: '800px', columns: 3, gutter: 20 },
			{ mq: '1050px', columns: 4, gutter: 20 },
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
					{
						hasMoreZabo ||
							<Feedback>
								<div>
									Zabo 는 Open Beta 서비스 입니다.
									더 나아질 수 있도록, 거침없는 의견 부탁드립니다.
								</div>
								<div>
									<input/>
									<button>
										Send
									</button>
								</div>
							</Feedback>
					}
				</div>
			</HomePageWrapper>
		)
	}
}

HomePage.propTypes = {}

HomePage.defaultProps = {}

export default HomePage
