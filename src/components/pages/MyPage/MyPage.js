import React, { PureComponent } from "react"


import SavedPosters from "templates/SavedPosters"
import MyPageWrapper from "./MyPage.styled"

class MyPage extends PureComponent {
	/* 그룹 || 뒤는 추후에 undefined나 null로 설정해둘 예정 */

	state = { username: 'No Name', clicked: 0 }

	onClick = (e) => {
		e.preventDefault()
		const { clicked } = this.state
		this.setState({ clicked: clicked ? 0 : 180 })
	}

	groupDropDown = () => {
		const { clicked } = this.state
		const { groups } = this.props.info

		return <div className="group-dropdown" style={{ "display": clicked ? 'flex' : 'none' }}> {
			groups.map(entry =>
				<div className="group-dropdown-name"
						 onClick={(e) => this.dropDownClick(e, entry)}>
					{entry.name}
				</div>)}
		</div>

	}

	dropDownClick = (event, entry) => {
		this.props.setCurrentGroup(entry._id)
	}


	render() {
		const { clicked } = this.state
		const { groups, firstName, lastName, currentGroup = {} } = this.props.info

		const username = (firstName && lastName) ? `${firstName} ${lastName}` : 'No Name'

		let imgRotate = {
			transform: `rotate(${clicked}deg)`,
			transition: `all 0.3s ease-out`,
		}

		return (
			<MyPageWrapper className="animated fadeIn">
				<div className="page-title">My Page</div>
				<div className="user-name">{username}</div>
				{groups &&
				<div className="group-selector" onClick={this.onClick}>
					<div className="group-name">
						<div className="selector"> {currentGroup.name} </div>
						<img src={require("static/icon/baseline-expand_more-24px.svg")}
								 style={imgRotate}/>
					</div>
					{this.groupDropDown()}
				</div>
				}
				<SavedPosters/>
			</MyPageWrapper>
		)
	}
}

MyPage.propTypes = {}

MyPage.defaultProps = {}

export default MyPage
