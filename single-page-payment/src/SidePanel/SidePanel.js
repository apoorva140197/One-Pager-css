import React, { Component } from 'react';
import classes from './SidePanel.module.css';
import { FormErrors } from '../FormErrors/FormErrors.js';
import Input from '../Input/Input';
import {checkValidity} from "../utils";

class SidePanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			number: '',
			formErrors: { email: '', number: '' },
			nameValid: false,
			emailValid: false,
			numberValid: false,
			formValid: false,
			controls: [
                 {
					type: 'text',
                    name: 'Name',
                    placeholder: 'Enter name here',
                    value:'',
					errorMessage: '',
					validations: {
						required: true,
						pattern: ''
                    },
                    touched: false
				},
				{
					type: 'text',
					name: 'Email ID',
					placeholder: 'Enter email ID here',
					value: '',
					errorMessage: 'Please enter a valid email',
					validations: {
						required: true,
						pattern: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                    },
                    touched: false
				},
				{
					type: 'text',
					name: 'Mobile Number',
                    placeholder: 'Enter mobile number here',
                    value:'',
					errorMessage: 'Enter a valid mobile number',
					validations: {
						required: true,
						pattern: /^\d{10}$/
                    },
                    touched: false
                }
               
			]
		};
	}

	onSubmit = (e) => {
		e.preventDefault();
	};

	// onChange = (e) => {
	// 	const name = e.target.name;
	// 	const value = e.target.value;
	// 	this.setState({ [name]: value }, () => {
	// 		this.validateField(name, value);
	// 	});
	// };

	// validateField(fieldName, value) {
	// 	let fieldValidationErrors = this.state.formErrors;
	// 	let emailValid = this.state.emailValid;
	// 	let numberValid = this.state.numberValid;

	// 	switch (fieldName) {
	// 		case 'email':
	// 			emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
	// 			fieldValidationErrors.email = emailValid ? '' : ' is invalid';
	// 			break;
	// 		case 'number':
	// 			numberValid = value.length >= 10;
	// 			fieldValidationErrors.number = numberValid ? '' : ' is too short';
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// 	this.setState(
	// 		{
	// 			formErrors: fieldValidationErrors,
	// 			emailValid: emailValid,
	// 			numberValid: numberValid
	// 		},
	// 		this.validateForm
	// 	);
	// }

	// validateForm() {
	// 	this.setState({ formValid: this.state.emailValid, numberValid: this.state.numberValid });
	// }

	// errorClass(error) {
	// 	return error.length === 0 ? '' : 'has-error';
	// }

	onChange(evt, index) {
        const {controls} = this.state;
        controls[index].value = evt.target.value;
        controls[index].touched = true;
        let formValid = true;
        for (let control of controls) {
            formValid = formValid && checkValidity(control.value, control.validations);
        }
       
        this.setState({controls, formValid});
	}

	render() {
		const { controls } = this.state;
		return (
			<div className={classes.SidePanel}>
				<p className={classes.SidePanelHeading}>Register and Purchase Course</p>

				{/* <FormErrors formErrors={this.state.formErrors} /> */}

				<div className={classes.SidePanelForm}>
					<form onSubmit={this.onSubmit} noValidate>
						{/* <div className={classes.SidePanelFormRow} >
                    <p className={classes.SidePanelFormRowName}>Name</p>
                    <Input type="text" name="name" placeholder="Enter name here" 
                    required value={this.state.name} onChange={this.onChange} className={classes.SidePanelFormRowInput}
                    
                    />    
                    </div>
                    <div className={classes.SidePanelFormRow}>
                    <p className={classes.SidePanelFormRowName}>Mobile Number</p>
                    <Input type="text" name="number" placeholder="Enter mobile number here" 
                    required value={this.state.number} onChange={this.onChange} className={classes.SidePanelFormRowInput}
                    />    
                    </div>
                    <div className={classes.SidePanelFormRow} className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                    <p className={classes.SidePanelFormRowName}>Email ID</p>
                    <Input type="text" name="email" placeholder="Enter email ID here" 
                    required value={this.state.email} onChange={this.onChange} className={classes.SidePanelFormRowInput}
                    />    
                    </div> */}
						{controls.map((control, index) => {
							return (
								<Input
									key={index}
									onChange={(evt) => this.onChange(evt, index)}
									name={control.name}
									value={control.value}
									placeholder={control.placeholder}
									type={control.type}
                                    validations={control.validations}
                                    errorMessage={control.errorMessage}
                                    touched={control.touched}
								/>
							);
						})}
					</form>
				</div>
				<div className={classes.SubmitButtonContainer}>
					<button className={classes.SubmitButton} disabled={!this.state.formValid}>
						Buy now
					</button>
				</div>
			</div>
		);
	}
}
export default SidePanel;
