
const express = require("express")
const port = 3000
const app = express()

app.use(express.static('public'))
app.use(express.json())

// Fill in your request handlers here

app.get("/", (req, res) => {
    res.render('index');
})


let updates = [];

app.post("/updates", (req, res) => {
    if(req.body.clientupdates.toString() != [])
    updates.push(req.body.clientupdates);
    let sentChanges = updates.slice(req.body.lastSeenIndex, updates.length)
    sentChanges = sentChanges.filter(array => array.length > 0)
    res.send({"updates": sentChanges, "last": updates.length});
})

app.listen(port)