import React from 'react'

const Test = () => {
	return (
		<div>
			<h1>Test</h1>
			{Math.random() < 0.8 ? <Test /> : 'Finished'}
		</div>
	)
}

export default Test
