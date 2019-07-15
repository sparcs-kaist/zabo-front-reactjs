import React, { PureComponent } from "react"
import PropTypes from "prop-types"


import SavedPosters from "templates/SavedPosters";
import MyPageWrapper from "./MyPage.styled"

class MyPage extends PureComponent {

  constructor(props) {
    super();

    /* 그룹 || 뒤는 추후에 undefined나 null로 설정해둘 예정 */
    this.state = {
      username : 'No Name',
      groups : props.info.groups || [],
      selectedGroup : 'select',
      clicked : 0,
    }
  }

  componentDidMount() {
    const { info } = this.props;

    const username = (info.firstName && info.lastName) ? `${info.firstName} ${info.lastName}` : 'No Name';

    this.setState({ username });

    info.groups.filter(item => {
      if( item._id === info.currentGroup) {
        this.setState({ selectedGroup : item.name});
      }
    });
  }

  onClick = (e) => {
    e.preventDefault();
    const { clicked } = this.state;
    this.setState({ clicked : clicked ? 0 : 180 });
  };

  groupDropDown = () => {
    const { groups, clicked } = this.state;
    return <div className="group-dropdown" style={{"display": clicked ? 'flex' : 'none'}}> {
      groups.map(entry =>
        <div className="group-dropdown-name"
             onClick={(e) => this.dropDownClick(e,entry)}>
          {entry.name}
        </div>)}
      </div>
      ;
  };

  dropDownClick = (event,entry) => {
    this.props.setCurrentGroup(entry._id);
    this.setState({selectedGroup : entry.name});
  }


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
            <div className="group-name">
              <div className="selector"> {selectedGroup} </div>
              <img src={require("static/icon/baseline-expand_more-24px.svg")}
              style={imgRotate} />
            </div>
            {this.groupDropDown()}
          </div>
        }
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
