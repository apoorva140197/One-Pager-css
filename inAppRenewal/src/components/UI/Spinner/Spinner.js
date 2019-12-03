import React from "react";
import PropTypes from "prop-types";
import classes from "./Spinner.module.css";

const spinner = ({ isGrey }) => {
	return (
		<div
			className={
				!isGrey
					? `${classes.Loader}`
					: `${classes.Loader} ${classes.Grey}`
			}
		>
			Loading...
		</div>
	);
};

spinner.propTypes = {
	isGrey: PropTypes.bool
};

export default spinner;
