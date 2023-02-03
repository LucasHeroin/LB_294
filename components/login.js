
function checkLoggedIn() {
    fetch("http://localhost:3000/auth/cookie/status", {
        
    })
    .then(r => {
        if(r.status == 401){
            document.getElementsByClassName("loggedout")[0].classList.remove("hidden")
        }else if(r.status == 200){
            document.getElementsByClassName("loggedout")[0].classList.add("hidden")
            document.getElementsByClassName("loggedin")[0].classList.remove("hidden")

        }
    })
}
document.forms[0].addEventListener("submit", function(e){
    e.preventDefault()

    fetch("http://localhost:3000/auth/cookie/login",{method: "POST",
    credentials: "include",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        email: event.target.email.value, password: event.target.password.value
    })
}).then(response => {
    if(response.status == 200){
        checkLoggedIn()
    }
})

})

checkLoggedIn()