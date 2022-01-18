require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./server/db');
const sessionRouter = require('./server/routes/session-router')
const app = express();
const apiPort = process.env.PORT || 3001; 
const buildPath = path.join(__dirname,'build');

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') { 
    app.use(express.static(buildPath));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(buildPath, 'index.html'));
    });    
}
else {
    app.get('/', (req, res) => { res.send('Hello World!') });
}

db.on('error', console.error.bind(console, 'MongoDB Connection Error:'))

app.use('/api', sessionRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`)) 