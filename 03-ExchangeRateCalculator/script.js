const apikey = '983edb1015270c2147688996';
const cmbxCurrencyElementOne = document.getElementById('currency-one');
const cmbxCurrencyElementTwo = document.getElementById('currency-two');
const txtAmontOne = document.getElementById('amount-one');
const txtAmontTwo = document.getElementById('amount-two');
const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

//fetch excahange rate and update DOM
const calculate = () => {
	const cmbx1SelectedValue = cmbxCurrencyElementOne.value;
	const cmbx2SelectedValue = cmbxCurrencyElementTwo.value;
	fetch(`https://v6.exchangerate-api.com/v6/983edb1015270c2147688996/latest/${cmbx1SelectedValue}`)
		.then(
			(onSuccessValue) => {
				return onSuccessValue.json();
			},
			(onRejectedValue) => {}
		)
		.then((data) => {
			//console.log(data);
			const rate = data.conversion_rates[cmbx2SelectedValue];
			//console.log(rate);
			rateElement.innerHTML = `1 ${cmbx1SelectedValue} = ${rate} ${cmbx2SelectedValue}`;
			txtAmontTwo.value = (txtAmontOne.value * rate).toFixed(2);
		});
};

//event listeners
cmbxCurrencyElementOne.addEventListener('change', calculate);
cmbxCurrencyElementTwo.addEventListener('change', calculate);
//input will fireup , if change using keyboard or using triangle
txtAmontOne.addEventListener('input', calculate);
txtAmontTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
	const temp = txtAmontOne.value;
	txtAmontOne.value = txtAmontTwo.value;
	txtAmontTwo.value = temp;
	calculate();
});

calculate();
