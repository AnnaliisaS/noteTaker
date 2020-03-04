// Dependencies
// =============================================================================
const express = require('express');
const path = require('path');
const fs = require('fs');
const notesdb = require('../../../db/db.json');

const app = express();
app.use(express.json());

app.get('/notes', (req, res) => {
    if(notesdb.length > 0) {
        for(let i = 0; i < notesdb.length; i++){
            notesdb[i].id = i + 1;
        }
    }
    res.json(notesdb);
})

app.post('/notes', (req, res) => {
    const newNote = req.body;
    let noteID = notesdb.length + 1;
  
    newNote.id = noteID;
  
    notesdb.push(newNote);
  
    fs.writeFile(
      path.join(__dirname, '../../../db/db.json'),
      JSON.stringify(notesdb),
      err => {
        if (err) throw err;
      }
    );
  
    res.json(newNote);
  });
  
  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
  
    notesdb.splice(
      notesdb.findIndex(note => note.id.toString() === id),
      1
    );
  
    fs.writeFile(
      path.join(__dirname, '../../../db/db.json'),
      JSON.stringify(notesdb),
      err => {
        if (err) throw err;
      }
    );
  
    res.json(notesdb);
  });

  module.exports = app;