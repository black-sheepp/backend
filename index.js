const dotenv = require('dotenv').config();
const path = require('path');
const express = require('express');
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000 ;

app.listen(PORT,()=>{
    console.log('Server is up and running on port '+PORT);
})
