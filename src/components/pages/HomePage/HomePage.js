import React, { PureComponent } from "react"
import { Link } from "react-router-dom" // do not refresh, but render on Link clicked

import HomePageWrapper, { Header, Feedback } from "./HomePage.styled"

import SearchBar from 'templates/SearchBar'
import ZaboList from "templates/ZaboList"
import SVG from "../../atoms/SVG"

class HomePage extends PureComponent {
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
		const { zaboList, zaboId } = this.props

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

					<ZaboList
						hasMoreZabo={this.state.hasMoreZabo}
						getNextZaboList={this.getNextZaboList}
						zaboList={zaboList}
						zaboId={zaboId}
					/>
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
