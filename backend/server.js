const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database Environment setup
// const uri = require('./config/keys');
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true 
});

// Database
const connection = mongoose.connection; 
connection.on('connected', () => {
    console.log('[Success]: Connected to database')
});
connection.on('error', (err) => {
    console.log('[Error]: Unable to connect to database...', err)
});

// routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//urls
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Port url
app.listen(port, () => {
    console.log(`[Success]:   Server is running on port: ${port}`);
});