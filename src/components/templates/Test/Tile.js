import React from "react";
import ReactDOM from "react-dom";

export default class Tile extends React.Component {
	render() {
		return (
			<div
				className="card"
				style={{
					height:`${this.props.style.height + 50}px`,
					background: "white"}}>
				<div
					className="innerCard"
					style={{
						height:`${this.props.style.height - 50}px`,
						background: this.props.style.background,
					}}>
				</div>
				<div className= "innerDetails">
					<h2>Tile No- {this.props.data}</h2>
				</div>
			</div>
		)
	}
}
