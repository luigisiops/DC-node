const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000

let dummydb = []

app.use(cors())

app.use(express.json())

app.get('/todos', (req,res) => {
    console.log(dummydb)
   res.send (dummydb)
})

app.post('/todos', (req,res) => {
    dummydb.push(req.body)
    res.json({success:true})
})

app.delete('/todos/:id', (req, res) =>{
    const id = req.params.id
    const toDeleteIndex = dummydb.findIndex(p=> p.id == id)
    dummydb.splice(toDeleteIndex,1)
    res.send('Delete request at /user')
}) 

app.put('/todos/:id'), (req, res) => {
    const id = req.params.id
    const toUpdateIndex = dummydb.findIndex(p=> p.id == id)
    dummydb[toUpdateIndex] = 
    {   "id": id,
        "title": req.params.title,
        "priority": req.params.priority,
        "date": req.params.date}
    res.send('updated')
}
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})