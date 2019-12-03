import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./Modal.module.css";
// import Aux from "../../../hoc/_Aux/_Aux";
import Backdrop from "../Backdrop/Backdrop";
import cross from "../../../assets/images/crossModal.svg";
// import closeImg from "../../../assets/icons/cross_black.svg";

class Modal extends Component {
	shouldComponentUpdate(nextProps) {
		return (
			nextProps.hidden !== this.props.hidden ||
			nextProps.hardUpdate ||
			(!nextProps.hidden && !this.props.hidden) ||
			false
		);
	}

	handleEsc = evt => {
		if (evt.keyCode === 27) {
			this.props.toggle && this.props.toggle(evt);
		}
	};

	componentDidMount() {
		window.addEventListener("keyup", this.handleEsc);
	}

	componentWillUnmount() {
		window.removeEventListener("keyup", this.handleEsc);
	}

	render() {
		let hidden = "";
		if (this.props.hidden) {
			hidden = classes.Hidden;
		}
		return (
			<div className={classes.Container + " " + hidden}>
				<div className={classes.Modal} style={this.props.style || {}}>
					{this.props.children}
					{!this.props.hideClose && (
						<button
							className={classes.CloseBtn}
							onClick={this.props.toggle}
						>
							<img src={cross} alt=""/>
						</button>
					)}
				</div>

				<Backdrop
					show={!this.props.hidden}
					toggle={this.props.toggle}
				/>
			</div>
		);
	}
}

Modal.propTypes = {
	children: PropTypes.any,
	hidden: PropTypes.bool.isRequired,
	isLarge: PropTypes.bool,
	toggle: PropTypes.func,
	hardUpdate: PropTypes.bool,
	style: PropTypes.object
};

export default Modal;
