const base=document.querySelector('.base');
const second=document.querySelector('.second');
const count=second.querySelector('#count');
const amount=second.querySelector('#amount');
const select=second.querySelector('.movies');
const seats=document.querySelectorAll('.seat:not(.reserved)');

// calculateTotal();
getFromLocalStorage();

function calculateTotal() {
    const selectedSeats=base.querySelectorAll('.seat.selected')
    let selectedCount = selectedSeats.length;
    count.innerText=selectedCount;
    amount.innerText=selectedCount*select.value;
    console.log(seats);

    const selectedSeatsArr=[];
    const seatsArr=[];

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
    })

    seats.forEach(function(seat){
        seatsArr.push(seat);
    })

    let selectedSeatIndex = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    })

    saveToLocalStorageIndex(selectedSeatIndex);
}

base.addEventListener('click',function(e) {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected');
    }
    calculateTotal()
})

select.addEventListener('change', function(){
    calculateTotal()
});

function saveToLocalStorageIndex(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovie', select.selectedIndex);
}

function getFromLocalStorage() {
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !=null && selectedSeats.length > 0) {
        seats.forEach(function(item,index) {
            if(selectedSeats.indexOf(index) > -1){
                item.classList.add('selected');
            }
        })
    }
    const selectedMovieIndex=localStorage.getItem('selectedMovie');

    if(selectedMovieIndex != null){
        select.selectedIndex=selectedMovieIndex
    }

}
