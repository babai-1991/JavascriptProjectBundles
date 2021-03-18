const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error message
const showError = (input, message) => {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	small.innerText = message;
};

//show success outline
const showSuccess = (input) => {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
};

//check email is valid
const checkEmail = (input) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	//return re.test(String(input).toLowerCase());
	if (re.test(input.value)) {
		showSuccess(input);
	} else {
		showError(input, `${input.value} is not a valid email`);
	}
};

//check required fields
const checkForRequired = (inputArray) => {
	inputArray.forEach((input) => {
		if (input.value.trim() === '') {
			showError(input, `${getFieldName(input)} is required`);
		} else {
			showSuccess(input);
		}
	});
};

// check for password matching
const checkPasswordMatch = (input1, input2) => {
	if (input1.value !== input2.value) {
		showError(input2, 'Passwords do not match');
	}
};
//check input length
const checkLength = (input, minimum, maximum) => {
	debugger;
	if (input.value.length < minimum) {
		showError(input, `${getFieldName(input)} must have ${minimum} character`);
	} else if (input.value.length > maximum) {
		showError(input, `${getFieldName(input)} must be maximum ${maximum} character`);
	} else {
		showSuccess(input);
	}
};

//return uppercase fieldname from id
const getFieldName = (input) => {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

//event listener
form.addEventListener('submit', (e) => {
	e.preventDefault();

	checkForRequired([ username, email, password, password2 ]);
	checkLength(username, 3, 10); //min 3 character max 10 character
	checkLength(password, 6, 15); //min 6 character max 15 character
	checkEmail(email);
	checkPasswordMatch(password, password2);
});
