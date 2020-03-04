// Dependencies
// =============================================================================
const express = require('express');
const path = require('path');
const api = require('./api')

// Sets up Express App
// =============================================================================
const app = express();
const PORT = process.env.PORT || 9090;

app.use(express.urlencoded({ extended: true }));
app.use('/api/', api);

// Routes
// =============================================================================
// Basic route that sends the user first to the "home" page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// gets server listening
// =============================================================================
app.listen(PORT, () => {
    console.log("app listening on port: " + PORT);
  });
  