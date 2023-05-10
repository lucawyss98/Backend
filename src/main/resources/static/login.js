document.getElementById("login").onclick = setAction

function setAction(event) {
  event.preventDefault()
  let username = document.getElementById("username").value
  sessionStorage.setItem("username", username);
  console.log(sessionStorage.getItem("username"))
  document.getElementById("loginForm").requestSubmit()
  }