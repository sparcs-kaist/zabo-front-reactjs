import React from "react"
import PropTypes from "prop-types"
import storage from "../../../lib/storage"
import withLog from "hoc/withLog"

export default (Component) => {
	class StackMaster extends React.Component {
		state = { stack: [] }

		componentDidMount() {
			const { zaboId } = this.props
			if (!zaboId) {
				storage.setItem('zaboStack', [])
			} else {
				let zaboStack = storage.getItem('zaboStack') || []
				zaboStack = Array.isArray(zaboStack) ? zaboStack : []
				const prev = zaboStack.pop()
				if (!!prev && prev !==zaboId) zaboStack.push(prev)
				zaboStack.push(zaboId)
				storage.setItem('zaboStack', zaboStack)
				this.setState({ stack: zaboStack })
			}
		}

		componentDidUpdate(prevProps, prevState, snapshot) {
			const { zaboId } = this.props
			if (prevProps.zaboId === zaboId) return

			if (!zaboId) {
				this.setState({ stack: [] })
				storage.setItem('zaboStack')
				return
			}

			this.setState(prevState => {
				const { stack } = prevState
				stack.push(zaboId)
				storage.setItem('zaboStack', stack)
				return { stack }
			})
		}

		render() {
			const { stack } = this.state
			const { zaboId, ...props } = this.props

			return <Component {...props} stack={stack}/>
		}
	}

	StackMaster.propTypes = {
		...Component.propTypes,
		zaboId: PropTypes.string,
	}

	return withLog(StackMaster)
}
