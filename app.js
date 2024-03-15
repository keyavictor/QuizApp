// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require ("path");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));
//index rendering
app.get('/', (req, res) => {
    // Render the HTML page located at 'index.html'
    res.sendFile(path.join(__dirname, 'index.html'));  });
  
// Route for submitting quiz
app.post('/submit', (req, res) => {
    const { name, answers, score, grade } = req.body;
    // Here you would save the data to your database
    console.log(`Name: ${name}, Score: ${score}/${answers.length}, Grade: ${grade}`);
    res.json({ score, grade });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
