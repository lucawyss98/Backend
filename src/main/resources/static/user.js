var username = sessionStorage.getItem("username")
const SERVERURL = "http://localhost:8080/reservation/"
window.onload(loadReservations)

var table = document.getElementById("mytable")


function loadReservations(){

    fetch(SERVERURL + username, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    })
    .then((response) => response.json())
    .then((data) => buildMyReservations(data.answer))
    .catch((err) => console.error(err));
        
}

function buildMyReservations(reservations){
    
    reservations.forEach(reservation => {
        let row = document.createElement("tr")
        let idcell = document.createElement("td").textContent(reservation.id)
        let datecell = document.createElement("td").textContent(reservation.date)
        let timecell = document.createElement("td").textContent(reservation.timeslots)
        let courtcell = document.createElement("td").textContent(reservation.court.name)
        let button = document.createElement("button")
        button.value = "edit"
        button.id = court.id
        button.addEventListener("click", deleteReservation(this.id))

        row.appendChild(idcell, datecell, timecell, courtcell)
    });
}

function deleteReservation(id){

    fetch(SERVERURL + "delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    })
    .then((response) => response.json())
    .then((data) => checkResponse(data.answer))
    .catch((err) => console.error(err));

}

function checkResponse(data){

}



