const SERVERURL = "http://localhost:8080/";

var idl = document.getElementById("id")
var cname = document.getElementById("name")
var sport = document.getElementById("sport")
var opentime = document.getElementById("openTime")
var closetime = document.getElementById("closeTime")
var saveBtn = document.getElementById("submitBtn")
var deleteBtn = document.getElementById("deleteBtn")

saveBtn.addEventListener("click", addCourt)
deleteBtn.addEventListener("click", deleteCourt)
window.onload = loadCourts

// ++++  API STUFF +++++

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

    let id = idl.innerHTML
    console.log(id)
    if(id != null && id != undefined && id !=""){

        fetch(SERVERURL + "deletecourt", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(id),
        })
        .then((response) => responseCheck(response))
        .catch((err) => console.error(err));

    }

}

function loadCourts(){
    console.log("loadcourts")
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
   
}

// ++++++ FUNKTIONEN ++++++++++

function buildCourts(courts){
    console.log(courts)
    let courttable = document.getElementById("courtbody")

    courts.forEach(court => {
        console.log(court)
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
        opentime.innerHTML = court.openTime
        let closetime= document.createElement("td")
        closetime.innerHTML = court.closeTime
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

function editcall(id){

    if(id != null){
        let editrow = document.getElementById(id)
        console.log(editrow)
        idl.innerHTML = editrow.cells[0].innerHTML
        cname.value = editrow.cells[1].innerHTML
        sport.value = editrow.cells[2].innerHTML
        opentime.value = editrow.cells[3].innerHTML
        closetime.value = editrow.cells[4].innerHTML  
    }

}

//TODO
function responseCheck(data){
    console.log(data)
    window.location.reload();
}





