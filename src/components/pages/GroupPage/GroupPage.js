import React, { PureComponent } from "react"
import { showInstanceModal } from "templates/Modal"

import GroupPageWrapper from "./GroupPage.styled"

class GroupPage extends PureComponent {
	removeMember = sid => {
		const { currentGroup } = this.props.info
		this.props.removeGroupUser(currentGroup._id, sid)
	}

	popUpRemove = sid => {
		showInstanceModal({
			content: "Are you sure you want to delete it?",
			cancelText: "Cancel",
			onOk: () => {
				this.removeMember(sid)
			},
			okText: "Delete",
		})
	}

	render() {
		const { currentGroup } = this.props.info
		return (
			<GroupPageWrapper className="animated fadeIn">
				<div className="page-title">Manage Your Group</div>
				<div className="warning">{`You can invite or delete the member.`}</div>
				<div className="groupName">
					<div>{currentGroup.name}</div>
					<a href={"/my-page/group/add"}>
						<img src={require("static/icon/person_add-24px.svg")} />
					</a>
				</div>
				<div className="members">
					Members
					{currentGroup.members.map(member => (
						<div>
							<div className="member-info">
								<div className="member">{member.studentId}</div>
								<div className="member-remove" onClick={e => this.popUpRemove(member.studentId)}>
									<img src={require("static/icon/remove-24px.svg")} />
								</div>
							</div>
							<hr className="line" />
						</div>
					))}
				</div>
			</GroupPageWrapper>
		)
	}
}

GroupPage.propTypes = {}

GroupPage.defaultProps = {}

export default GroupPage
