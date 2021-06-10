const hallContainer = document.querySelector('.hall-container');
const seats = document.querySelectorAll('.seat-row .seat:not(.occupied)');

const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');

let ticketPrice = +movieSelect.value;

// update and save seleced seats
const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.seat-row .seat.selected');
    const selecetedSeatsCount = selectedSeats.length;

    count.innerText = selecetedSeatsCount;
    total.innerText = selecetedSeatsCount * ticketPrice;

    const selectedIndexes = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('slectedSeats', JSON.stringify(selectedIndexes));

}



//select vacant seats
hallContainer.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});



//get and save seleced movie
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    localStorage.setItem('selectedMovieIndex', e.target.selectedIndex);
    localStorage.setItem('selectedMoviePrice', +e.target.value);

    updateSelectedCount();
});


//populate seates from saved data 
const populateSavedSeats = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('slectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    ticketPrice = +localStorage.getItem('selectedMoviePrice');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    //update on startup
    updateSelectedCount();

}

populateSavedSeats();