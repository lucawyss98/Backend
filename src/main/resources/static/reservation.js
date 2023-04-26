const SERVERURL = "http://localhost:8080/"

sessionStorage.setItem("username", "luca1")

var courtSelector = document.getElementById("court")
var startSelector = document.getElementById("startTime")
var endSelector = document.getElementById("endTime")
var dateSelector = document.getElementById("date")

/* var minDate = new Date() + 1
dateSelector.min = minDate.toISOString().split("T")[0]
var maxDate = new Date() + 30
dateSelector.max = maxDate.toISOString().split("T")[0] */
var courts = []
var reservations = []


window.onload = loadReservations
dateSelector.addEventListener("change", setTimelogic)
courtSelector.addEventListener("change", setTimelogic)
startSelector.onchange = setEndselection



// +++++ API +++++++++

function loadReservations(){

    fetch(SERVERURL + "courts")
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

function buildReservations(courtlist){

    courts = courtlist

    let tablediv = document.getElementById("reservations")
        courts.forEach(court => {

            let table = document.createElement('table');
            let tablehead = document.createElement("thead")
            let tdate = document.createElement("th"), 
                ttime = document.createElement("th"),
                tuser = document.createElement("th")
                title = document.createElement("h3")
            title.innerHTML = "Reservations on " + court.name
            tdate.innerHTML = "Date"
            ttime.innerHTML = "Time"
            tuser.innerHTML = "User"

            tablehead.append(tdate, ttime, tuser)
            table.append(tablehead)
            tablediv.appendChild(title)

            //loading all reservations into tables
            let tbody = document.createElement("tbody")

            court.reservations.forEach(reservation => {

                    let row = document.createElement('tr');
                    let cell = document.createElement("td")
                    cell.innerHTML = reservation.date
                    let cell1 = document.createElement("td")
                    cell1.innerHTML = reservation.startTime + " - " + reservation.endTime
                    let cell2 = document.createElement("td")
                    cell2.innerHTML = reservation.user_id.username

                    row.append(cell, cell1, cell2)
                    tbody.appendChild(row);          
            });        
            
            table.appendChild(tbody)
            
            tablediv.appendChild(table)
            tablediv.appendChild(document.createElement("br"))  
        });
    buildOptions()
}

function buildOptions(){
    console.log(courts)
    courts.forEach(c => {

        let option = document.createElement("option")
        option.textContent = c.name
        console.log(courtSelector)
        courtSelector.append(option)
    })

    let timeslots = clockArray()
    let v = 0
    timeslots.forEach(t => {
        let o = document.createElement("option")
        let o1 = document.createElement("option")
        o.value = t
        o.id = v
        o1.value = t
        o1.className = v
        startSelector.add(o)
        endSelector.add(o1)
    })
}

function setTimelogic(){

    let date = dateSelector.value
    let court = courtSelector.value
    let startoptions = startSelector.getElementsByTagName("option")

    if(date !=null && date != undefined && date!= "" && court !=null && court != undefined && court != ""){
        for (let i =0; i<courts.length; i++){
            if(courts[i].name == court){
                reservations = c.reservations
                court = courts[i]
                break;
            }
        }

        //++set starttime++
        //disable bis opening time
        for (let j = 0; j<startoptions.length; j++){
            if(court.startTime.slice(0,5) == startoptions[j].textContent){
                break;
            }
            startoptions[j].disabled = true
        }

        // disable after closing time
        for (let j = startoptions.length-1; j>=0; j--){
            if(court.closeTime.slice(0,5) == startoptions[j].textContent){
                break;
            }
            startoptions[j].disabled = true
        }

        //existing reservations
        reservations.forEach(r => {
            if(r.date == date){
                let soid,eoid = undefined
                for (let i = 0; i < startoptions.length; j++ ){
                     //search beginning
                    if(startoptions[i].value == r.startTime.slice(0,5)){
                        soid = startoptions[i].id
                    }
                    //search end
                    if(startoptions[i].value == r.endTime.slice(0,5)){
                        eoid = startoptions[i].id
                    }
                }
                //disable everything between
                for (let x = soid; x<eoid; x++ ){
                    startoptions[x].disabled = true
                }
            }

        })
    }
}

function setEndselection(){
    let endOptions = endSelector.getElementsByTagName("option")
    if(date !=null && date != undefined && date!= "" && court !=null && court != undefined && court != "" 
        && startSelector.value != null && startSelector.value != undefined && startSelector != ""){
        
            //disable everything before the starting time
            let start = startSelector.value
            for(let i = 0; i < endOptions.length; i++){
                if(endOptions[i].value == start){
                    endOptions[i].disabled = true
                    break;
                }
                endOptions[i].disabled = true
            }
            reservations.forEach(r => {
                if(compareTime(start, r.endTime.slice(0,5)) == -1){
                    for (let y = endOptions.length; y<0; y--){
                        if(endOptions[y].value == r.startTime.slice(0,5)){
                            break;
                        }
                        endOptions[y].disabled=true
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
    let timeList = clockarray()
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
    //TODO antwort und close
}



