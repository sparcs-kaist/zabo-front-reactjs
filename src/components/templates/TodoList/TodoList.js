import React, { PureComponent, useState } from "react"
import PropTypes from "prop-types"

import TodoListWrapper, { HeaderWrapper, TodoWrapper, TodosWrapper } from "./TodoList.styled"


export class Header extends PureComponent {
	state = { text: "" }

	handleChange = e => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			this.submit()
			e.preventDefault()
		}
	}

	submit = (e) => {
		const { addTodo } = this.props
		const { text } = this.state
		addTodo(text)
		this.setState({ text: "" })
	}

	render() {
		const { text } = this.state
		return (
			<HeaderWrapper>
				<div>
					<i className="fas fa-chevron-down"></i>
				</div>
				<input
					name="text" placeholder="What needs to be done?" onChange={this.handleChange} value={text}
					onKeyDown={this.handleKeyDown}
				/>
			</HeaderWrapper>
		)
	}
}

Header.propTypes = {
	addTodo: PropTypes.func.isRequired,
}

const Todo = ({ onClick, completed, text }) => (
	<TodoWrapper
		onClick={onClick}
		style={{
			textDecoration: completed ? 'line-through' : 'none'
		}}
		completed={completed}
	>
		{text}
	</TodoWrapper>
)

Todo.propTypes = {
	onClick: PropTypes.func.isRequired,
	completed: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired
}


const Todos = ({ todos, toggleTodo }) => (
	<TodosWrapper>
		{todos.map(todo => (
			<Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
		))}
	</TodosWrapper>
)

Todos.propTypes = {
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			completed: PropTypes.bool.isRequired,
			text: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	toggleTodo: PropTypes.func.isRequired
}

class TodoList extends React.Component {
	render() {
		const { todos, TodoActions } = this.props

		console.log("render todos", todos)
		return (
			<TodoListWrapper>
				<Header addTodo={TodoActions.addTodo} />
				<Todos todos={todos} toggleTodo={TodoActions.toggleTodo} />
			</TodoListWrapper>
		)
	}
}

TodoList.propTypes = {
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			completed: PropTypes.bool.isRequired,
			text: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
}

TodoList.defaultProps = {
}

export default TodoList
