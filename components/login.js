
function checkLoggedIn() {
    fetch("http://localhost:3000/auth/cookies/status", {

})
    .then(r => {
        if(r.status == 401){
            document.getElementsByClassName("loggedout")[0].classList.remove("hidden")
        }else if(response.status == 200){
            document.getElementsByClassName("loggedout")[0].classList.add("hidden")
            document.getElementsByClassName("loggedin")[0].classList.remove("hidden")

        }
    })
}
document.forms[0].addEventListener("submit", function(e){
    event.preventDefault()

    fetch("http://localhost:3000/auth/cookies/login",{method: "POST",
    credentials: "include",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        email: event.target.email.value, password: event.target.password.value
    })
}).then(response => {
    if(response.status == 200){
        checkLoggedIn()
    }
    checkLoggedIn()
})

})
