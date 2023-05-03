sessionStorage.setItem("username", "luca1")
var serverUrl = "http://localhost:8080/";
var courts = []
var court
var courtSelector
var startSelector
var endSelector
var dateSelector

window.onload = loadReservations

/* var minDate = new Date() + 1
dateSelector.min = minDate.toISOString().split("T")[0]
var maxDate = new Date() + 30
dateSelector.max = maxDate.toISOString().split("T")[0] */








// +++++ API +++++++++

function loadReservations(){

    courtSelector = document.getElementById("court")
    startSelector = document.getElementById("startTime")
    endSelector = document.getElementById("endTime")
    dateSelector = document.getElementById("date")
    dateSelector.onchange = setTimelogic
    courtSelector.addEventListener("change", setTimelogic)
    startSelector.onchange = setEndselection
    document.getElementById("makeBtn").addEventListener("click", makeReservation)

    fetch(serverUrl + "courts")
    .then((response) => response.json())
    .then((data) => buildReservations(data))
    .catch((err) => console.error(err)); 
    
}

function makeReservation(){

    var res = {
        startTime: startSelector.value,
        endTime: endSelector.value,
        date: dateSelector.value,
        courtName: courtSelector.value,
        username: sessionStorage.getItem("username")
    }
    console.log(res)
    fetch(serverUrl + "add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(res),
    })
    .then((response) => checkresponse(response))
    .catch((err) => console.error(err));

}

//++++++++++ Functions +++++

function buildReservations(courtlist){

    courts = courtlist
    console.log(courts)
    let tablediv = document.getElementById("reservations")
        courts.forEach(court => {
            
            if(court.reservations.length != 0){
                let table = document.createElement('table');
                let tablehead = document.createElement("thead")
                let tdate = document.createElement("th"), 
                    ttime = document.createElement("th"),
                    title = document.createElement("h3")
                title.innerHTML = "Reservations on " + court.name
                tdate.innerHTML = "Date"
                ttime.innerHTML = "Time"

                tablehead.append(tdate, ttime)
                table.append(tablehead)
                tablediv.appendChild(title)

                //loading all reservations into tables
                let tbody = document.createElement("tbody")

                court.reservations.forEach(reservation => {

                        let row = document.createElement('tr');
                        let cell = document.createElement("td")
                        cell.innerHTML = reservation.date
                        let cell1 = document.createElement("td")
                        cell1.innerHTML = reservation.startTime.slice(0,5) + " - " + reservation.endTime.slice(0,5)

                        row.append(cell, cell1)
                        tbody.appendChild(row);          
                });        
                
                table.appendChild(tbody)
                
                tablediv.appendChild(table)
                tablediv.appendChild(document.createElement("br")) 
            }
        });
    buildOptions()
}

function buildOptions(){
    courts.forEach(c => {
    courtSelector = document.getElementById("court")
        let option = document.createElement("option")
        option.textContent = c.name
        courtSelector.append(option)
    })

    let timeslots = clockArray()
    startSelector = document.getElementById("startTime")
    endSelector = document.getElementById("endTime")
    for(let v = 0; v < timeslots.length; v++){
        let o = document.createElement("option")
        let o1 = document.createElement("option")
        o.textContent = timeslots[v]
        o.id = v
        o1.textContent = timeslots[v]
        o1.id = v
        o1.disabled = true
        startSelector.add(o)
        endSelector.add(o1)
    }
}

function setTimelogic(){

    let date = dateSelector.value
    court = courtSelector.value
    let startOptions = startSelector.getElementsByTagName("option")

    if(date !=null && date != undefined && date!= "" && court !=null && court != undefined && court != ""){
        for (let x = 0; x<startOptions.length; x++){
            startOptions[x].disabled = false
        }
        //get reservations from selectet court
        for (let i =0; i<courts.length; i++){
            if(courts[i].name == court){
                court = courts[i]
                break;
            }
        }

        //++set starttime++
        //disable bis opening time
        for (let j = 0; j<startOptions.length; j++){
            if(court.openTime.slice(0,5) == startOptions[j].textContent){
                break;
            }
            startOptions[j].disabled = true
        }

        // disable after closing time
        for (let j = startOptions.length-1; j>=0; j--){
            if(court.closeTime.slice(0,5) == startOptions[j].textContent){
                startOptions[j].disabled = true
                break;
            }
            startOptions[j].disabled = true
        }

        //existing reservations
        court.reservations.forEach(r => {

            if(r.date == date){
                let soid,eoid
                for (let i = 0; i < startOptions.length; i++ ){
                     //search beginning
                    if(startOptions[i].value == r.startTime.slice(0,5)){
                        soid = startOptions[i].id
                    }
                    //search end
                    if(startOptions[i].value == r.endTime.slice(0,5)){
                        eoid = startOptions[i].id
                    }
                }
                //disable everything between
                for (let x = soid; x<eoid; x++ ){
                    startOptions[x].disabled = true
                }
            }

        })
    }
}

function setEndselection(){
    let endOptions = endSelector.getElementsByTagName("option")
    let date = dateSelector.value
    if(date !=null && date != undefined && date!= "" && court !=null && court != undefined && court != "" 
        && startSelector.value != null && startSelector.value != undefined && startSelector != ""){
        //reenable everithing
        for (let x = 0; x<endOptions.length; x++){
            endOptions[x].disabled = false
        }
        //disable bis opening time
        for (let j = 0; j<endOptions.length; j++){
            if(court.openTime.slice(0,5) == endOptions[j].textContent){
                endOptions[j].disabled = true
                break;
            }
            endOptions[j].disabled = true
        }

        // disable after closing time
        for (let j = endOptions.length-1; j>=0; j--){
            if(court.closeTime.slice(0,5) == endOptions[j].textContent){
                break;
            }
            endOptions[j].disabled = true
        }
        //disable everything before the starting time
        let start = startSelector.value
        for(let i = 0; i < endOptions.length; i++){
            if(endOptions[i].value == start){
                endOptions[i].disabled = true
                break;
            }
            endOptions[i].disabled = true
        }
        //disable reservation times

        court.reservations.forEach(r => {
            if(date == r.date){
                if(compareTime(start, r.endTime.slice(0,5)) == -1){
                    for(let a = endOptions.length -1 ; a>=0; a--){
                        if(r.startTime.slice(0,5) == endOptions[a].textContent){
                            break
                        }
                        endOptions[a].disabled = true
                    }
                }
            }
        })     
    }
}

function clockArray(){

    let clock = [];
    let m = [0,30];

    for (let h = 0; h <= 23; h++) {
        m.forEach(mi => {
            let timeS = ("0" + h).slice(-2) + ":" + ("0" + mi).slice(-2);
            clock.push(timeS);
        }) 
    }
    return clock;
}

function compareTime(timestamp, timestamp1){

    let timeList = clockArray()
    let pos1, pos2
    for (let x = 0; x < timeList.length; x++){
        if(timeList[x] == timestamp){
            pos1 = x
        }
        if(timeList[x] == timestamp1){
            pos2 = x
        }
    }
    if(pos1 < pos2){
        return -1
    }else{
        if(pos1 == pos2){
            return 0
        }else{
            return 1
        }
    }
}

function checkresponse(data){
    window.location.reload();
    console.log(data)
    //TODO antwort und close
}



