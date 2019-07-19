import React, { PureComponent } from "react"
import { Link } from "react-router-dom"  // do not refresh, but render on Link clicked
import PropTypes from "prop-types"

import HomePageWrapper, { Header, ZaboList, Zabo } from "./HomePage.styled"
import SearchBar from 'templates/SearchBar'
import SVG from "../../atoms/SVG"
import axios from "../../../lib/axios"

class HomePage extends PureComponent {
	state = {
		searchFocused: false,
		zaboList: [],
	}

	_onSearchFocusBlur = (e) =>
		this.setState(prevState => {
			return {
				searchFocused: !prevState.searchFocused,
			}
		})

	// @media query 로 몇줄 있어야 하는지 계산.
	// 자보 요청 보내서 response => 순서대로 가장 길이 짧은 줄에 넣기.
	//

	/*
	 * componentDidMount: 'mount' === return component
	 */
	componentDidMount() {
		console.log("begin of componentDidMount");

		/*
		 * GET zabo list:
		 */
		axios.get('/zabo/list')
			.then(res => {
				const zaboWithPhotos = res.data.filter( item => item.photos[0] !== undefined );
				this.setState({ zaboList: zaboWithPhotos })
			})
			.catch(error => {
				console.log(error);
			})
		console.log("end of componentDidMount")
	}

	render() {
		const { zaboList, searchFocused } = this.state
		console.log("render start");

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
					<ZaboList>
						{ console.log("render zabolist") }
						{
							zaboList.map( zabo =>
								<Zabo>
									<Zabo.Poster>
										<img
											width="100%"
											//height={}
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
								</Zabo>
							)
						}
						<Zabo>
							<Zabo.Poster>
								<img
									width="100%"
									src="https://about.canva.com/wp-content/uploads/sites/3/2015/01/concert_poster-tb-220x0.png"
								 />
							</Zabo.Poster>
							<Zabo.Writings>
								<Zabo.Writings.Title>
									Jazz Concertia
								</Zabo.Writings.Title>
								<Zabo.Writings.Author>
									SPARCS
								</Zabo.Writings.Author>
							</Zabo.Writings>
						</Zabo>
						<Zabo>
							<Zabo.Poster>
								<img
									width="100%"
									src="https://piktochart.com/wp-content/uploads/2018/01/poster-conference.jpg"
								 />
							</Zabo.Poster>
							<Zabo.Writings>
								<Zabo.Writings.Title>
									Annual Business Conference
								</Zabo.Writings.Title>
								<Zabo.Writings.Author>
									SPARCS2
								</Zabo.Writings.Author>
							</Zabo.Writings>
						</Zabo>
					</ZaboList>
				</div>
			</HomePageWrapper>
		)
	}
}

HomePage.propTypes = {}

HomePage.defaultProps = {}

export default HomePage
