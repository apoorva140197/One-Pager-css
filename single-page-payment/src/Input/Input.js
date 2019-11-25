import React from 'react';
import classes from './Input.module.css';
import {checkValidity} from "../utils";

export default function Input(props) {
	return (
		<div className={classes.Row}>
			<p className={classes.Label}>{props.name}</p>
			<input
                maxlength={props.name=='Mobile Number'?10:''}
				type={props.type}
				name={props.name}
				placeholder={props.placeholder}
				required
				value={props.value}
				onChange={props.onChange}
                className={classes.Input}
			/>
			{props.touched && !checkValidity(props.value, props.validations) && <p style={{color: "red", fontSize: "small"}}>{props.errorMessage}</p>}
		</div>
	);
}
