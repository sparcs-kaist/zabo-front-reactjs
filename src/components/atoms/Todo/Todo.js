import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import TodoWrapper from "./Todo.styled"

const Todo = ({ onClick, completed, text }) => (
	<TodoWrapper
		onClick={onClick}
		style={{
			textDecoration: completed ? 'line-through' : 'none'
		}}
	>
		{text}
	</TodoWrapper>
)

Todo.propTypes = {
	onClick: PropTypes.func.isRequired,
	completed: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired
}

Todo.defaultProps = {
}

export default Todo
