
const SERVERURL = "http://localhost:8080/";
const userlogin = document.getElementById("username");
const passwordlogin = document.getElementById("password");
const loginbtn = document.getElementById("submit");

loginbtn.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});

function login() {
  sessionStorage.setItem("username", userlogin.value);
  var user = {
    username: userlogin.value,
    password: passwordlogin.value,
  };

  fetch(SERVERURL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => loginHandler(data.answer))
    .catch((err) => console.error(err));
}

function loginHandler(data) {
  switch (data) {
    case "wrong":
      alert("username or password wrong");
      break;
    case "ok":
      sessionStorage.setItem("username", userlogin.value);
      location.replace("./reservation.html");
  }
}