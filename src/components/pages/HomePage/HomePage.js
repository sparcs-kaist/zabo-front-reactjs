import React, { PureComponent } from "react"
import { Link } from "react-router-dom" // do not refresh, but render on Link clicked

import HomePageWrapper, { Header } from "./HomePage.styled"
import SearchBar from 'templates/SearchBar'
import ZaboList from "templates/ZaboList"
import SVG from "../../atoms/SVG"
import axios from "../../../lib/axios"

class HomePage extends PureComponent {
	state = {
		searchFocused: false,
		zaboList: [],
		hasMoreZabo: true,
	}

	_onSearchFocusBlur = () =>
		this.setState(prevState => {
			return {
				searchFocused: !prevState.searchFocused,
			}
		})

	/*
	 * GET ZaboList:  @param - 0 for initial, 1 for next
	 */
	getZaboList = (call) => {
		// TODO: Redux 로 만들기

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
		// TODO: zabo 더 남아있는지 체크해서 hasMoreZabo == false 로 바꿔주기
	}

	/*
	 * componentDidMount: 'mount' === render()
	 */
	componentDidMount() {
		// load initial zabo list
		this.getZaboList(0)
	}


	render() {
		const { zaboList, searchFocused } = this.state
		const { zaboId } = this.props

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

				</div>
			</HomePageWrapper>
		)
	}
}

HomePage.propTypes = {}

HomePage.defaultProps = {}

export default HomePage
