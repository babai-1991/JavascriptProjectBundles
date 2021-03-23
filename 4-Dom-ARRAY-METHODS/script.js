const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

//data
let data = [];

//fetch random user and add money
const getRandomUser = async () => {
	const response = await fetch('https://randomuser.me/api/');
	const data = await response.json();
	//console.log(data);
	const user = data.results[0];
	//console.log(user);

	//create new user
	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000)
	};
	//console.log(newUser);
	addData(newUser);
};

//add new user to data array
const addData = (newUserObject) => {
	data.push(newUserObject);
	updateDom();
};

//if nothing pass , use data array
const updateDom = (providedData = data) => {
	//clear main div
	main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
	providedData.forEach((data) => {
		const element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML = `<strong>${data.name}</strong> ${formatMoney(data.money)}`;
		main.appendChild(element);
	});
};

//format number as money
//    https://stackoverflow.com/a/14428340/3881832
const formatMoney = (amount) => {
	return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

const doubleMoney = () => {
	data = data.map((user) => {
		return { ...user, money: user.money * 2 };
	});

	updateDom();
};

const sortbyRichest = (e) => {
	data = data.sort((user1, user2) => {
		return user2.money - user1.money;
	});
	updateDom();
};

const showMillionaire = () => {
	data = data.filter((user) => {
		return user.money >= 1000000;
	});
	updateDom();
};

const calcuateTotalWealth = () => {
	const wealth = data.reduce((accumulator, currentuser) => {
		return (accumulator += currentuser.money);
	}, 0);
	//console.log(wealth);
	//put in dom
	const wealthElemenent = document.createElement('div');
	wealthElemenent.innerHTML = `<h3>Total Wealth: <strnog> ${formatMoney(wealth)} </strong></h3>`;
	main.appendChild(wealthElemenent);
};

//event lisener
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortbyRichest);
showMillionairesBtn.addEventListener('click', showMillionaire);
calculateWealthBtn.addEventListener('click', calcuateTotalWealth);

getRandomUser();
