// Dependencies
// =============================================================================
const express = require('express');
const path = require('path');
const fs = require("fs");
const notesdb = require("./db/db.json");

// Sets up Express App
// =============================================================================
const app = express();
const PORT = process.env.PORT || 9090;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Routes
// =============================================================================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    notesdb.push(newNote);
    addId();
    let save = JSON.stringify(notesdb);
    fs.writeFileSync("db.json",save)

    res.redirect('back');
});

app.delete("/api/notes/:id", (req, res) => {
    const deleted = notesdb.findIndex((i) => i.id == req.params.id);
    notesdb.splice(deleted, 1);
    reWrite();
    res.json(notesdb);
});

function addId() {
    notesdb.forEach((element, i) => {
        element.id = i + 1;
    });
};
let reWrite = () => {
    let newDB = JSON.stringify(notesdb);
    fs.writeFile('db.json', newDB, err => { if (err) throw err });
};

app.get("/api/notes", (req, res) => {
    return res.json(notesdb);
});

// gets server listening
// =============================================================================
app.listen(PORT, () => {
    console.log("app listening on port: " + PORT);
  });
  