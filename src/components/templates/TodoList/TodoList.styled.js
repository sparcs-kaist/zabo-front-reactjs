import styled from "styled-components"

const TodoListWrapper = styled.form`
	margin-left: auto;
	margin-right: auto;
	margin-top: 100px;
	
	width: 400px;
	height: auto;
`

export const HeaderWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 50px;
	font-size: 24px;
	
	div {
		width: 50px;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		opacity: 0.2;
		cursor: pointer;
	}
	
	input {
		flex: 1;
		height: 100%;
		border: none;
		font-size: 24px;
		font-style: italic;
		padding: 0 12px;
	}
	
	input::placeholder {
		color: rgba(0,0,0,0.15);
	}
`

export const TodosWrapper = styled.ul`
	list-style: none;
`

export const TodoWrapper = styled.li`

`

export default TodoListWrapper
