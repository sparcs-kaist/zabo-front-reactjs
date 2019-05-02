import React from 'react';
import Bricks from 'bricks.js';
import InfiniteScroll from 'react-infinite-scroller';
import MDSpinner from 'react-md-spinner';
import Loading from "templates/Loading"
import './ReactBricks.scss';

class ReactBricks extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			containerId: this.props.containerId || "bricks-container",
			sizes: this.props.sizes || [
				{columns: 2, gutter: 20},
				{mq: '768px', columns: 3, gutter: 25},
				{mq: '1024px', columns: 5, gutter: 40}
			],
			packed: this.props.packed || "data-packed",
			hasMoreBricks : this.props.hasMoreBricks || false,
			useWindowForScroll: this.props.useWindowForScroll || true,
			loaderComponent: this.props.loaderComponent || this.initializeLoader(),
			style: this.props.style || {}
		}
	}
	initializeLoader = () => {
		let size = null,
			duration = null,
			color = null;
		if (this.props.defaultLoaderStyle){
			size = this.props.defaultLoaderStyle.spinnerSize || 28;
			duration = this.props.defaultLoaderStyle.spinnerDuration || 1333;
			color = this.props.defaultLoaderStyle.spinnerColor || null;
			return (
				<div className = "bricks-spinner">
					<Loading />
				</div>
			)
		}
		else {
			return (
				<div className = "bricks-spinner">
					<Loading/>
				</div>
			)
		}

	}


	initializeBricks = () => {
		const instance = Bricks({
			position: false,
			container: `#${this.state.containerId}`,
			packed: this.state.packed,
			sizes: this.state.sizes
		});
		return instance;
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.reRender) {
			this.resizeBricksLayout();
		}
	}
	componentDidMount() {
		if (this.props.bricks && this.props.bricks.length > 0) {
			this.bricksInstance = this.initializeBricks();
			this.bricksInstance.pack();
		}
	}
	resizeBricksLayout = () => {
		this.bricksInstance.resize(true);
	}
	componentDidUpdate(prevProps) {
		if (prevProps.bricks.length === 0 && this.props.bricks.length === 0)
			return;
		if (prevProps.bricks.length !== this.props.bricks.length) {
			return this.bricksInstance.update();
		}
	}
	packLayout = () => {
		this.bricksInstance.pack();
	}
	updateBricksLayout = () => {
		this.bricksInstance.update();
	}
	componentWillUnmount() {
		this.bricksInstance.resize(false);
	}

	render() {
		return (
			<InfiniteScroll className= "masonry-class"
											pageStart = {0}
											loadMore = {this.props.loadMoreBricks}
											loader = {this.state.loaderComponent}
											hasMore = {this.state.hasMoreBricks}
											useWindow = {this.state.useWindow}>
				<section className = "bricks-container"
								 id = {this.state.containerId}
								 style = {this.props.style}>
					{this.props.bricks}
				</section>
			</InfiniteScroll>
		);
	}
}
export default ReactBricks;
