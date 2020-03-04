// Dependencies
// =============================================================================
const express = require('express');
const path = require('path');

// Sets up Express App
// =============================================================================
const app = express();
const PORT = process.env.PORT || 9090;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================================
// Basic route that sends the user first to the "home" page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../../notes.html"));
});


// gets server listening
// =============================================================================
app.listen(PORT, () => {
    console.log("app listening on port: " + PORT);
  });
  