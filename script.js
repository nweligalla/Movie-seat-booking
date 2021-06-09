const hallContainer = document.querySelector('.hall-container');
const seats = document.querySelectorAll('.seat-row .seat:not(.occupied)');

const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');

let ticketPrice = +movieSelect.value;

const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.seat-row .seat.selected');
    const selecetedSeatsCount = selectedSeats.length;

    count.innerText = selecetedSeatsCount;
    total.innerText = selecetedSeatsCount * ticketPrice;

}

hallContainer.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    updateSelectedCount();
});



