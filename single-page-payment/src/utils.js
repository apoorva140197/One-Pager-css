export function checkValidity(value, validations) {
	let isValid = true;

	if (validations.required) {
		isValid = isValid && !!value;
	}
	if (validations.pattern) {
		isValid = isValid && validations.pattern.test(value);
	}

	return isValid;
}