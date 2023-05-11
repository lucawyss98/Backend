const SERVERURL = "http://localhost:8080/";

var idl = document.getElementById("id")
var cname = document.getElementById("name")
var sport = document.getElementById("sport")
var opentime = document.getElementById("openTime")
var closetime = document.getElementById("closeTime")
var saveBtn = document.getElementById("submitBtn")
var deleteBtn = document.getElementById("deleteBtn")
var newBtn = document.getElementById("newBtn")
var courtForm = document.getElementById("courtForm")


saveBtn.addEventListener("click", addCourt)
deleteBtn.addEventListener("click", deleteCourt)
newBtn.addEventListener("click", resetForm)
window.onload = loadCourts

// ++++  API STUFF +++++

// TODO maybe function fetchfunction(method, body) returns response

function addCourt(){


    if(idl.innerHTML != null && idl.innerHTML != "" && idl.innerHTML != undefined){
        var court = {
            "id": idl.innerHTML,
            "name": cname.value,
            "sport": sport.value,
            "openTime": opentime.value,
            "closeTime": closetime.value
        }
    }else{
        var court = {
            "name": cname.value,
            "sport": sport.value,
            "openTime": opentime.value,
            "closeTime": closetime.value
        }
    }

    fetch(SERVERURL + "addcourt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(court),
    })
    .then((response) => responseCheck(response))
    .catch((err) => console.error(err));   
}

function deleteCourt(){
    if(confirm("Are you sure you want to delete the Court")){
        let id = idl.innerHTML
        if(id != null && id != undefined && id !=""){
    
            fetch(SERVERURL + "deletecourt", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: id,
            })
            .then((response) => responseCheck(response))
            .catch((err) => console.error(err));
    
        }
    }else{}

}

function loadCourts(){

    fetch(SERVERURL + "courts", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(),
    })
    .then((response) => response.json())
    .then((data) => buildCourts(data))
    .catch((err) => console.error(err));

   loadOptions()
}

function loadOptions(){

    fetch(SERVERURL + "sports")
        .then((response) => response.json())
        .then((data) => buildoptions(data))
        .catch((err) => console.error(err));
}

// ++++++ FUNKTIONEN ++++++++++

function buildCourts(courts){

    let courttable = document.getElementById("courtbody")

    courts.forEach(court => {

        let row = document.createElement("tr");
        row.id = court.id

        //create Cells
        let idcell = document.createElement("td")
        idcell.innerHTML = court.id
        let namecell= document.createElement("td")
        namecell.innerHTML =court.name
        let sportcell= document.createElement("td")
        sportcell.innerHTML = court.sport
        let opentime= document.createElement("td")
        opentime.innerHTML = court.openTime.slice(0,5)
        let closetime= document.createElement("td")
        closetime.innerHTML = court.closeTime.slice(0,5)
        let button = document.createElement("button")
        button.innerHTML = "edit"
        button.id = court.id
        button.addEventListener("click", function(){
            editcall(this.id)
        })

        //add cellse to Row
        row.append(idcell, namecell, sportcell, opentime, closetime, button)
        courttable.appendChild(row)
    }); 
}

function buildoptions(data){
    data.forEach(c => {
        let o = document.createElement("option")
        o.textContent = c
        sport.add(o)
    })
    buildTimes()
}

function buildTimes(){

    let timeslots = clockArray()
    timeslots.forEach(t =>{
        let o = document.createElement("option")
        let o1 = document.createElement("option")
        o.textContent = t
        o.value = t
        o1.textContent = t
        o1.value = t
        opentime.add(o)
        closetime.add(o1)
    })
}

function editcall(id){

    if(id != null){
        let editrow = document.getElementById(id)
        
        idl.innerHTML = editrow.cells[0].innerHTML
        cname.value = editrow.cells[1].innerHTML
        sport.value = editrow.cells[2].innerHTML
        opentime.value = editrow.cells[3].innerHTML
        closetime.value = editrow.cells[4].innerHTML  
    }
}

function resetForm(){
    courtForm.reset()
    idl.innerHTML = ""
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



//TODO
function responseCheck(data){
    window.location.reload();
    console.log(data)
}





