let items = []

function loadTasks() {

    fetch("http://localhost:3000/auth/cookie/tasks", { method: "GET", credentials: "include" })
        .then((r) => r.json())
        .then(json => {
            items = json
            renderList()
        })
}
function addNewTasktoMyBack(itemText) {
    fetch("http://localhost:3000/auth/cookie/tasks", {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: itemText })
    })
        .then(response => {
            if (response.ok) {
                loadTasks()
            } else {
                alert("Failed")
            }
        })
}
function deleteMyBack(i) {
    fetch(`http://localhost:3000/auth/cookie/task/${i}`, {
        method: "DELETE", credentials: "include",
        headers: { "Content-Type": "application/json" }
    })
        .then(response => {
            if (response.ok) {
                loadTasks()
            } else {
                alert("Failed")
            }
        })
}

function scratchMyBAck(itemText, id) {
    fetch(`http://localhost:3000/auth/cookie/tasks`, {
        method: "PUT", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: itemText, id: id })
    })
        .then(response => {
            if (response.ok) {
                loadTasks()
            } else {
                alert("Failed")
            }
        })
}
//RENDER so that the array and the output on the website stays the same
function renderList() {
    const listElement = document.getElementById("todoListContent")
    listElement.innerText = ""

    items.forEach(function (listItem, i) {
        const newItemElement = document.createElement("li")
        const newPElement = document.createElement("p")
        newPElement.classList.add("notthick")
        newPElement.innerText = `${listItem.title}`
        newItemElement.append(newPElement)
        listElement.append(newItemElement)

        const deleteButton = document.createElement('button')
        deleteButton.classList.add("thicker")
        deleteButton.innerText = " ␡ "
        deleteButton.addEventListener('click', function () {
            deleteMyBack(listItem.id)
            //  items.splice(i, 1)
            renderList()
        });

        const editButton = document.createElement('button')
        editButton.classList.add("thick")
        editButton.innerText = " ✎ "
        editButton.addEventListener('click', () => {

            const inputChange = document.createElement("input")
            inputChange.type = "text"
            inputChange.name = "toDo"
            //if (inputChange.value == newPElement.innerText) return
            inputChange.value = newPElement.innerText
            newItemElement.replaceChildren(inputChange)

            inputChange.addEventListener("blur", () => {
                if (inputChange.value != "") {
                    //items[i] = inputChange.value
                    scratchMyBAck(inputChange.value, listItem.id)
                } renderList()
            })
            inputChange.addEventListener("change", () => {
                /*
                value = inputChange.value
                if(value != "") {
                    items[i] = value
                }
                */
                scratchMyBAck(inputChange.value, listItem.id)
                renderList()
            })
        });

        newItemElement.append(deleteButton)
        newItemElement.append(editButton)

    });

};

function addToDo(e) {

    //doesn't allow a page-reset on formula send
    e.preventDefault()
    const newItemInputElement = document.getElementsByName("toDo")[0]
    const listElement = document.getElementById("todoListContent")
    //removes any space before and after the input
    const itemText = newItemInputElement.value.trim()
    if (itemText == "") return

    addNewTasktoMyBack(itemText)
    newItemInputElement.value = ""
    renderList()
};





//ADD childs
document.getElementById("toDo").addEventListener('submit', addToDo)
document.getElementById("add").addEventListener('click', addToDo)


//RESET childs
document.getElementById("reset").addEventListener("click", function (e) {
    e.preventDefault()
    items = []
    renderList()
});

loadTasks()
// document.getElementsByTagName("li").addEventListener('mouseover', () => )
