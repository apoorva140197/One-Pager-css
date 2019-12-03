import React, { Component } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
import Modal from "./Modal";
import FormatModal from "../../FormatModal/FormatModal";
import classes from "./Modal.module.css";
// import CancelButton from "../CancelButton/CancelButton";
// import Button from "../Button/Button";
// import * as actions from "../../../store/actions";
import Spinner from "../Spinner/Spinner";

const stateToProps = state => {
	return {
		hidden: !state.modal.show,
		onCancel: state.modal.onCancel,
		onSuccess: state.modal.onSuccess,
		message: state.modal.message,
		title: state.modal.title,
		cancelAction: state.modal.cancelAction,
		successAction: state.modal.successAction,
		loading: state.modal.loading
	};
};

const dispatchToProps = dispatch => {
	return {
		killDialog: () => dispatch(actions.killDialog())
	};
};

// @connect(
//   stateToProps,
//   dispatchToProps
// )
class Dialog extends Component {
	static propTypes = {
		hidden: PropTypes.bool.isRequired,
		onCancel: PropTypes.func,
		message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
		title: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.string,
			PropTypes.element
		]),
		cancelAction: PropTypes.string,
		successAction: PropTypes.string,
		onSuccess: PropTypes.func,
		killDialog: PropTypes.func.isRequired,
		loading: PropTypes.bool.isRequired
	};

	successHandler = event => {
		event.preventDefault();
		this.props.onSuccess && this.props.onSuccess();
	};

	cancelHandler = event => {
		event.preventDefault();
		this.props.onCancel && this.props.onCancel();
		this.props.killDialog();
	};

	render() {
		const {
			title,
			message,
			cancelAction,
			successAction,
			hidden,
			loading
		} = this.props;
		return (
			<Modal hidden={hidden} toggle={this.cancelHandler}>
				<FormatModal title={title}>
					{loading ? (
						<Spinner />
					) : (
						<React.Fragment>
							<div className={classes.Content}>{message}</div>
							<div className={classes.Footer}>
								{cancelAction && (
									<Button onClick={this.cancelHandler}>
										{cancelAction}
									</Button>
								)}
								{successAction && (
									<Button onClick={this.successHandler}>
										{successAction}
									</Button>
								)}
							</div>
						</React.Fragment>
					)}
				</FormatModal>
			</Modal>
		);
	}
}

export default connect(
	stateToProps,
	dispatchToProps
)(Dialog);
