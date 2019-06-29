import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import SavedPosters from "templates/SavedPosters";
import MyPageWrapper from "./MyPage.styled"

class MyPage extends PureComponent {

  constructor(props) {
    super();

    /* 그룹 || 뒤는 추후에 undefined나 null로 설정해둘 예정 */
    this.state = {
      username : props.name || 'No Name',
      group : props.group || 'No group',
      clicked : 0,
    }
  }

  onClick = (e) => {
    e.preventDefault();
    const { clicked } = this.state;
      if ( !clicked ) {
        this.setState({ clicked : 180});
      } else {
        this.setState({clicked : 0});
      }
  };



	render() {
    const { clicked, group } = this.state;

    let imgRotate = {
      transform: `rotate(${clicked}deg)`,
      transition: `all 0.3s ease-out`
    };

    const groupNames = (
      /* if not  selected
      group -> maps. List contents!
      if selected
      groupNames -> selected group
      */
      <div></div>
    );

		return (
			<MyPageWrapper className="animated fadeIn">
        <div className="page-title">My Page </div>
        <div className="user-name">{this.state.username}</div>
        { group &&
          <div className="group-selector" onClick={this.onClick}>
            <div className="selector"> select </div>
            {groupNames}
            <img src={require("static/images/baseline-expand_more-24px.svg")}
              style={imgRotate}/>
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
