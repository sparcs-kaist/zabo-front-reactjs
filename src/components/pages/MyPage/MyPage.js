import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import { load_saveposter } from "store/reducers/groups";

import SavedPosters from "templates/SavedPosters";
import MyPageWrapper from "./MyPage.styled"

class MyPage extends PureComponent {

  constructor(props) {
    super();

    /* 그룹 || 뒤는 추후에 undefined나 null로 설정해둘 예정 */
    this.state = {
      username : `${props.info.firstName} ${props.info.lastName}` || 'No Name',
      groups : props.groups ||
      [
        {
          "_id": "5d1b717803a21c0a2afd2c76",
          "name": "HouTest"
        },
        {
          "_id": "5d1b717803a21c0a2afd2c71234",
          "name": "DJGod"
        }
      ],
      selectedGroup : 'select',
      clicked : 0,
    }
  }

  onClick = (e) => {
    e.preventDefault();
    const { clicked } = this.state;
    this.setState({ clicked : clicked ? 0 : 180 });
  };

  componentDidMount() {
    const { groups } = this.props;
    const groupsId = this.props.info.groups;
    console.log(groups, groupsId);

    if ( !groups &&  groupsId) {
      //call_group_names into state
      console.log('call name');
      console.log(this.props);
      this.props.load_saveposter(groupsId[0])
    }
  }

  groupDropDown = () => {
    const { groups, clicked } = this.state;

    console.log(groups);

    return <div className="group-dropdown" style={{"display": clicked ? 'flex' : 'none'}}> {
      groups.map(entry =>
        <div className="group-dropdown-name">
          {entry.name}
        </div>)}
      </div>
      ;
  };


  render() {
    const { clicked, groups, selectedGroup } = this.state;

    let imgRotate = {
      transform: `rotate(${clicked}deg)`,
      transition: `all 0.3s ease-out`
    };

		return (
			<MyPageWrapper className="animated fadeIn">
        <div className="page-title">My Page </div>
        <div className="user-name">{this.state.username}</div>
        { groups &&
          <div className="group-selector" onClick={this.onClick}>
            <div className="selector"> {selectedGroup} </div>
            <img src={require("static/icon/baseline-expand_more-24px.svg")}
              style={imgRotate} />
          </div>
        }
        {this.groupDropDown()}
        <SavedPosters />
			</MyPageWrapper>
		)
	}
}

MyPage.propTypes = {
}

MyPage.defaultProps = {
}

export default MyPage
