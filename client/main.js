const display = document.getElementById('display-data')
const title = document.getElementById('title')
const priority = document.getElementById('priority')
const submit = document.getElementById('submit')

let id = 0
submit.addEventListener('click', () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    id += 1

    let titledata = title.value
    let prioritydata = priority.value
    let todaydata = today

    fetch('http://localhost:3000/todos', {
        method: 'POST',
        body: JSON.stringify({
            id: id,
            title: titledata,
            priority: prioritydata,
            date: todaydata,
        }),
        headers: ({ 'Content-Type': 'application/json' }),

    })
        .then(item => item.json())
        .then(data => {
            display.innerHTML = ''
            getData()
        })
})

let getData = () => {
    fetch('http://localhost:3000/todos')
        .then(response => (response.json())
            .then(data => {
                let listItems = data.map((item) => {
                    return `
            <div> Todo:
            <li>id: ${item.id}</li>
            <li>Task: ${item.title}</li>
            <li>Priority: ${item.priority}</li>
            <li>Task: ${item.date}</li>
            <button onclick = "deleteData(${item.id})" = delete>Delete</button>
            <button onclick = "updateData(${item.id})">Update</button>
            <div> --------------------</div>
            </div>
            `
                })
                display.insertAdjacentHTML('beforeend', listItems.join(''))

            }))
}

let deleteData = (id) => {
    fetch(`http://localhost:3000/todos/${id}`,
        { method: 'DELETE' })
        .then(response => (response.json())
        .then(data =>{
        display.innerHTML = ''
        getData()
        }))
}

let updateData = (id) => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    let titledata = title.value
    let prioritydata = priority.value
    let todaydata = today

    fetch(`http://localhost:3000/todos/${id}`,
        {
            method: 'PUT',
            body: JSON.stringify({
                title: titledata,
                priority: prioritydata,
                date: todaydata,
            }),
            headers: ({ 'Content-Type': 'application/json' }),
        })
        .then(item => item.json())
        .then(data=> {
            display.innerHTML = ''
            getData()
        })
    }


