/*
Always remember , In localstorage , You have to save as string 
*/

const container = document.querySelector('.container');
// grab all .seat that are inside .row and whose are not occupied
const availableSeats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

// to convert string to number add + sign or you could use pareInt()
let ticketPrice = +movieSelect.value;

// seat click event
// two ways -1> using seats.forEach() or 2. add event listener on container and check for seat click(prefered)
container.addEventListener('click', (e) => {
	//console.log(e.target);
	// grab those elements having only .seat class not  .seat .occupied class
	if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
		//console.log(e.target);
		e.target.classList.toggle('selected');

		//update total selected seat and total price
		updateSelectedCount();
	}
});

//movie change event
movieSelect.addEventListener('change', (e) => {
	ticketPrice = +e.target.value;
	//also store movie selected index and price in local storage.
	const movieIndex = e.target.selectedIndex;
	setMovieData(movieIndex);
	updateSelectedCount();
});

const setMovieData = (movieIndex) => {
	localStorage.setItem('selectedMovieIndex', movieIndex);
};

const updateSelectedCount = () => {
	const selectedSeats = document.querySelectorAll('.row .seat:is(.selected)');
	//console.log(selectedSeats);
	const selectedSeatsCount = selectedSeats.length;
	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;

	/* local storage functionality*/
	const selectedSeatsArray = [ ...selectedSeats ];
	const selectedSeatIndexArray = selectedSeatsArray.map((selectedSeat) => {
		//get index of selectedSeat from total non-occupied seats
		return [ ...availableSeats ].indexOf(selectedSeat); // [7,1,3,4].indexOf(3) returns 2 , if not match return -1
	});

	//save in local storage
	localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatIndexArray));
};

//get data from local storage and populate UI
function populateUI() {
	const selectedSeatsIndexArray = JSON.parse(localStorage.getItem('selectedSeats'));

	if (selectedSeatsIndexArray != null && selectedSeatsIndexArray.length > 0) {
		availableSeats.forEach((seat, index) => {
			if (selectedSeatsIndexArray.indexOf(index) > -1) {
				seat.classList.add('selected');
			}
		});
	}

	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
	if (selectedMovieIndex != null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}
//initial count from local storage and calculation
updateSelectedCount();
