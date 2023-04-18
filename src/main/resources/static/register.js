
  
const SERVERURL = "http://localhost:8080/";

function register() {
    var username = document.getElementById("username");
    var eMail = document.getElementById("mail");
    var password = document.getElementById("psw");
    var password2 = document.getElementById("psw2");
    var fname = document.getElementById("firstname");
    var lname = document.getElementById("lastname");
    var errorUsername = document.getElementById("errorUser");
    var errorEmail = document.getElementById("errorEmail");
    console.log(username.value);
    
    var isFormula = true;
    let messages = [];
    if (username.value === "" || username.value == null) {
      messages.push("Please, type a username");
      errorUsername.innerText = messages.join(", ");
      isFormula = false;
    }
  
    if (password.value !== password2.value) {
      messages.push("Please confirm your password correctly");
      errorPW.innerText = messages.join(", ");
      isFormula = false;
    }
  
    if (password.value.length < 6) {
      messages.push("Your password is too short");
      errorPW.innerText = messages.join(", ");
      isFormula = false;
    }
  
    if (isFormula) {
        var user = {
            firstname: fname.value,
            lastname: lname.value,
            username: username.value,
            email: eMail.value,
            password: password.value,
        };
      fetch(SERVERURL + "register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => registerCheck(data.answer))
        .catch((err) => console.error(err));
    }
}

function registerCheck(answer) {
    switch (answer) {
      case "username":
        errorUsername.innerText = "Username already exists";
        break;
      case "email":
        errorEmail.innerText = "Email already exists";
        break;
      case "ok":
        console.log("success");
        sessionStorage.setItem("username", username.value)
        window.location.replace(SERVERURL)
        break;
    }
  }

