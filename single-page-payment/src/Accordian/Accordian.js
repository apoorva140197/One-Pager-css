import React from "react";
import classes from "./Accordian.module.css";


class Accordian extends React.Component {
	constructor(props) {
		super(props);
		this.paraRef = React.createRef();
	}
	state = {
		showPara: true,
		showReadButton: false
	};
	handleClick = () => {
		this.setState({
			showPara: !this.state.showPara
		});
	};
	componentDidUpdate(prevState) {
		if (prevState.questionId !== this.props.questionId) {
			let paraDiv = this.paraRef.current;
			if (
				document.documentElement.clientHeight /
					paraDiv.getBoundingClientRect().height >
				3
			) {
				this.setState({
					showPara: true,
					showReadButton: false
				});
			} else {
				this.setState({
					showPara: false,
					showReadButton: true
				});
			}
		}
	}

	componentDidMount() {
		let paraDiv = this.paraRef.current;
		if (
			document.documentElement.clientHeight /
				paraDiv.getBoundingClientRect().height <
			3
		)
			this.setState({
				showPara: false,
				showReadButton: true
			});
	}

	render() {
		return (
			<div
				className={
					classes.borderBottom +
					(this.props.conditionalMargin
						? " " + classes.conditionalMargin + " "
						: "")
				}
			>
				<div
					ref={this.paraRef}
					className={
						this.state.showPara
							? classes.paraComplete
							: classes.paraDesc
					}
				>
					{this.props.description}
				</div>
				{this.state.showReadButton && (
					<button
						className={classes.btnInAcc}
						onClick={this.handleClick}
					>
						{this.state.showPara ? "Read Less" : "Read More"}
					</button>
				)}
			</div>
		);
	}
}

export default Accordian;
