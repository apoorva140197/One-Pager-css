import React from "react";
import PropTypes from "prop-types";
import classes from "./FormatModal.module.css";
const formatModal = props => {
	const { title, children } = props;
	const Title = title;
	return (
		<div className={classes.FormatModal}>
			<div className={classes.Title}>
				{typeof title === "function" ? (
					<Title />
				) : typeof title == "string" ? (
					<p>{title}</p>
				) : (
					title
				)}
			</div>
			<div
				className={classes.Content}
				style={!title ? { borderTop: "none" } : {}}
			>
				{children}
			</div>
		</div>
	);
};
formatModal.propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
		PropTypes.element
	]),
	children: PropTypes.any
};
export default formatModal;
