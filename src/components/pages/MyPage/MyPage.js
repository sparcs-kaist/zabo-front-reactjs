import React, { PureComponent } from "react"
import { Link, Redirect } from "react-router-dom"

import MyPageWrapper, { Header, User, Groups } from "./MyPage.styled"

import SavedPosters from "templates/SavedPosters"
import Chevron_Home from "../../../static/images/chevron_home.svg"
import Circle from "../../../static/images/circle.svg"

class MyPage extends PureComponent {
	/* 그룹 || 뒤는 추후에 undefined나 null로 설정해둘 예정 */

	state = {
		username: 'No Name',
		clicked: 0,
		currentGroup: "",
	}

	onClick = (e) => {
		e.preventDefault()
		const { clicked } = this.state
		this.setState({ clicked: clicked ? 0 : 180 })
	}

	dropDownClick = (event, entry) => {
		this.props.setCurrentGroup(entry._id)
	}

	render() {
		const { clicked } = this.state
		const { sso_uid, groups, studentId, firstName, lastName, currentGroup = {} } = this.props.info
		const username = (firstName && lastName) ? `${firstName} ${lastName}` : 'No Name'
		let imgRotate = {
			transform: `rotate(${clicked}deg)`,
			transition: `all 0.5s ease-out`,
		}
		console.log("info: ", this.props.info)
		console.log({ groups })

		if (!this.props.isAuthenticated) return <Redirect to="/auth/login"/>
		return (
			<MyPageWrapper className="animated fadeIn">
				<div className="container">
					<Header>
						<Link to="/">
							<img src={Chevron_Home} alt="back to home"/>
						</Link>
						<Header.Head>
							<div>
								<div className="page-title">프로필</div>
								<div className="page-done">완료</div>
							</div>
							<div className="page-explanation">
								You can invite or delete the member.
							</div>
						</Header.Head>
					</Header>
					<User>
						<img src={Circle} alt={username}/>
						<div className="user-name">
							박근용
							{/*	{username} */}
						</div>
					</User>
					<Groups>
						{
							groups.length !== 0 ?
								<div>
									<div className="group-selector" onClick={this.onClick}>
										<div className="group-name">
											<div className="selector"> { currentGroup.name } </div>
											<img src={require("static/icon/baseline-expand_more-24px.svg")}
													 style={imgRotate}/>
										</div>
										<div className="group-dropdown"
												 style={{ "display": clicked ? 'flex' : 'none' }}>
											{
												groups.map((entry, i) =>
													<div key={i}
															 className="group-dropdown-name"
															 onClick={(e) => this.dropDownClick(e, entry)}>
														{entry.name}
													</div>,
												)
											}
										</div>
									</div>
									{
										currentGroup.members.map(member => {
											if (member.studentId === studentId && member.isAdmin === true)
												return <Link to="/">
													<div className="group-control">그룹관리</div>
												</Link>
											else return <div/>
										})
									}
								</div>
								:
								<div>
									No Groups
								</div>
						}
					</Groups>
					<SavedPosters user={sso_uid}/>
				</div>
			</MyPageWrapper>
		)
	}
}

MyPage.propTypes = {}

MyPage.defaultProps = {}

export default MyPage
