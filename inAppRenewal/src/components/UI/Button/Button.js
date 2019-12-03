import React from "react";
import classes from "./Button.module.css";
import PropTypes from "prop-types";

const Button = props => {
	return (
		<button
			{...props}
			className={props.className ? props.className : classes.Button}
		>
			{props.children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.any
};

export default Button;
