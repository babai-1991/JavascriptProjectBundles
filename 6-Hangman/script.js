const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');
const words = [ 'application', 'programming', 'interface', 'wizard' ];
let selectedWord = words[Math.floor(Math.random() * words.length)];
//console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

//show hidden word
const displayWord = () => {
	//convert word into array of words
	//wordEl.innerHTML = `${Array.from(selectedWord)}`;
	//or
	wordEl.innerHTML = `${selectedWord
		.split('')
		//include()-> check if element is present in array or not
		.map((letter) => {
			return `<div class="letter">${correctLetters.includes(letter) ? letter : ''}</div>`;
		})
		.join('')}`;

	/*
        convert 
        a
        b
        c 
        into
        abc
        */
	const innerWord = wordEl.innerText.replace(/\n/g, '');
	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Congratulation! You Won 🏆';
		popup.style.display = 'flex'; //none to flex
	}
};

//keydown
window.addEventListener('keydown', (e) => {
	debugger;
	//A-65 Z-90
	if (e.keyCode >= 65 && e.keyCode <= 90) {
		const letter = e.key;
		if (selectedWord.includes(letter)) {
			if (!correctLetters.includes(letter)) {
				correctLetters.push(letter);
				displayWord();
			} else {
				showNotification();
			}
		} else {
			if (!wrongLetters.includes(letter)) {
				wrongLetters.push(letter);
				updateWrongLetters();
			} else {
				showNotification();
			}
		}
	}
});

const showNotification = () => {
	notification.classList.add('show');
	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
};
const updateWrongLetters = () => {
	//1. display wrong lettets
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong: </p>' : ''}
    ${wrongLetters.map((letter) => {
		return `<span>${letter}</span>`;
	})}`;

	//2. print character
	figureParts.forEach((part, index) => {
		//how many wrong letters are there
		const errorsCount = wrongLetters.length;
		if (index < errorsCount) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	//3. check if game over or not after character gets completed
	if (wrongLetters.length == figureParts.length) {
		finalMessage.innerText = 'Unfortunately, You lost 😭';
		popup.style.display = 'flex';
	}
};

//restart game
playAgainBtn.addEventListener('click', () => {
	//reset data
	//const variables cannot be reset like aArray = []; so use splice()
	correctLetters.splice(0);
	wrongLetters.splice(0);

	//display random word
	selectedWord = words[Math.floor(Math.random() * words.length)];
	displayWord();

	//update wrong letters
	updateWrongLetters();

	popup.style.display = 'none';
});
displayWord();
