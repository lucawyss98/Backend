const SERVERURL = "http://localhost:8080/";

var id = getElementById("id")
var cname = getElementById("name")
var sport = getElementById("sport")
var opentime = getElementById("openTime")
var closetime = getElementById("closeTime")
var saveBtn = getElementById("submitBtn")
var deleteBtn = getElementById("deleteBtn")

saveBtn.addEventListener("click", addCourt)
deleteBtn.addEventListener("click", deleteCourt)
window.addEventListener('load', (event) => {
    loadCourts;
  });

// ++++  API STUFF +++++

function addCourt(){

    if(id != null && id != ""){
        var court = {
            id: id.value,
            name: cname.value,
            sport: sport.value,
            openTime: opentime.value,
            closeTime: closetime.value
        }
    }else{
        var court = {
            name: cname.value,
            sport: sport.value,
            openTime: opentime.value,
            closeTime: closetime.value
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
    .then((response) => response.json())
    .then((data) => responseCheck(data.answer))
    .catch((err) => console.error(err));    
}

function deleteCourt(){

    let id = form.elements["id"]
    fetch(SERVERURL + "deletecourt", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(id),
    })
    .then((response) => response.json())
    .then((data) => registerCheck(data.answer))
    .catch((err) => console.error(err));

}

function loadCourts(){
    console.log("loadcourts")
    fetch(SERVERURL + "courts", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(courtid),
    })
        .then((response) => response.json())
        .then((data) => buildCourts(data.answer))
        .catch((err) => console.error(err));
   
}

// ++++++ FUNKTIONEN ++++++++++

function buildCourts(courts){
    var courttable = document.getElementById("courttable")

    courts.forEach(court => {
        var row = document.createElement("tr")
        row.className = court.id

        //create Cells
        var idcell = document.createElement("td").innerText(court.id)
        var namecell= document.createElement("td").innerText(court.name)
        var sportcell= document.createElement("td").innerText(court.sport)
        var opentime= document.createElement("td").innerText(court.openTime)
        var closetime= document.createElement("td").innerText(court.closeTime)
        var buttoncell= document.createElement("td")
        var button = document.createElement("button")
        button.value = "edit"
        button.id = court.id
        button.addEventListener("click", editcall(this.id))

        //add cellse to Row
        row.appendChild(idcell, namecell, sportcell, opentime, closetime, buttoncell)

        courttable.appendChild(row)

    });
}

function editcall(id){
    let editrow = document.getElementsByClassName(id)

    id.value = editrow[0].value
    cname.value = editrow[1].value
    sport.value = editrow[2].value
    opentime.value = editrow[3].value
    closetime.value = editrow[4].value

}

function responseCheck(data){
    //TODO close window
}





