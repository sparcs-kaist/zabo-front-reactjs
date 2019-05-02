import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import get from "lodash.get"

import TodoList from "./TodoList"

import * as todoActions from "store/reducers/todo"

class TodoListContainer extends React.Component {
	render() {
		console.log("container render", this.props)
		return (
			<TodoList {...this.props} />
		)
	}
}

const mapStateToProps = (state) => {
	console.log("map ", state.todo.todos)
	return {
		todos: get(state, ["todo", "todos"])
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		TodoActions: bindActionCreators(todoActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoListContainer)
