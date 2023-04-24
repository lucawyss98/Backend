const SERVERURL = "http://localhost:8080/"


var courtselector = document.getElementById("court")
var timeselector = document.getElementById("time")
var dateselector = document.getElementById("date")

var reservations = []
var courts = []

window.onload = loadReservations()
dateselector.addEventListener("change", setTimeslots())
courtselector.addEventListener("change", setTimeslots())



// +++++ API +++++++++

function loadOptions(){
    
    fetch(SERVERURL + "courts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
    })
    .then((response) => response.json())
    .then((data) => buildOptions(data.answer))
    .catch((err) => console.error(err));

}

function loadReservations(){

    fetch(SERVERURL + "all")
    .then((response) => response.json())
    .then((data) => buildReservations(data))
    .catch((err) => console.error(err)); 
    
}

function makeReservation(){

    fetch(SERVERURL + "add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(reservation),
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

    loadReservations()
}

//++++++++++ Functions +++++

function buildReservations(res){

    reservations = res
    var tablediv = document.getElementById("reservations")
    var courts = [...new Set(res.court)]

    
    courts.forEach(court => {

        var table = document.createElement('table');
        var tablehead = document.createElement("thead")
        var tdate, ttime, tuser = document.createElement("th")
        tdate.innerHTML = "Date"
        ttime.innerHTML = "Time"
        tuser.innerHTML = "User"
        tablehead.append(tdate, ttime, tuser)
        table.append(tablehead)

        //loading all reservations into tables
        
        reservations.forEach(reservation => {

            if(reservation.court.name == court.name){

                var row = document.createElement('tr');
                var cell = document.createElement("td")
                cell.innerHTML = reservation.date
                var cell1 = document.createElement("td")
                cell1.innerHTML = reservation.timeSlots
                var cell2 = document.createElement("td")


                row.append(cell, cell1, cell2)
                table.appendChild(row);
                
            }

        });
        
        tablediv.appendChild(title)
        tablediv.appendChild(table)
       
    });
    
}

function buildOptions(courts){



    courts.forEach(court => {

        let option = document.createElement("option")
        option.value = court.name
        courtselector.appendChild(option)

    })

}

function setTimeslots(){

    let date = dateselector.value
    let court = courtselector.value
    let usedtimeslots = []

    if (date != null || date != "" && court != null || court != ""){

        courts.forEach(c => {
            if(c.name = court){
                court = c
                reservations.forEach(r => {
                    if(r.date == date && r.court.name == court){
                        usedtimeslots += r.timeslots
                    }
                })  
                
            }

        })
        let t1 =[]
        let t2 = []
        for (let i = court.openTime; i < court.closeTime; i++){
            t1 += i
            if(i + 0.3 < court.closeTime){
                t2 += i+ 0.3    
            }
        }
        t1.concat(t2)
        ctimes = t1.sort()

        let unique = ctimes.filter((o) => usedtimeslots.indexOf(o) === -1)
        unique.forEach((u) => {
            let op = document.createElement("option")
            op.value = u
            timeselector.appendChild(op)
        })
    }
}


function checkresponse(data){
    //TODO antwort und close
}



