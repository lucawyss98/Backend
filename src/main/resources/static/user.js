var username = sessionStorage.getItem("username")
const SERVERURL = "http://localhost:8080/"
window.onload = loadReservations

var table = document.getElementById("mytable")


function loadReservations(){

    fetch(SERVERURL + "mine/" +username)
    .then((response) => response.json())
    .then((data) => buildMyReservations(data))
    .catch((err) => console.error(err));
        
}

function buildMyReservations(reservations){
    console.log(reservations)
    let table = document.getElementById("mytable")
    reservations.forEach(reservation => {

        let row = document.createElement("tr")
        let idcell = document.createElement("td")
        idcell.innerText = reservation.id
        let datecell = document.createElement("td")
        datecell.innerText = reservation.date
        let timecell = document.createElement("td")
        timecell.innerText = reservation.startTime.slice(0,5) + " - " + reservation.endTime.slice(0,5)
        let courtcell = document.createElement("td")
        courtcell.innerText = reservation.court_id.name

        let button = document.createElement("button")
        button.innerText = "delete"
        button.id = reservation.id
        button.addEventListener("click", function(){
            deleteReservation(this.id)
        })

        row.append(idcell, datecell, timecell, courtcell, button)
        table.append(row)
    });
}

function deleteReservation(id){

    fetch(SERVERURL + "delete", {
        method: "DELETE",
        body: id,
    })
    .then((response) => response.json())
    .then((data) => checkResponse(data))
    .catch((err) => console.error(err));
}

function checkResponse(data){
    window.location.reload
    console.log(data)
}



