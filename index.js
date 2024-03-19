const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.EXPRESS_APP_MONGO_DB_KEY, {})
    .then(() => console.log('DB Connected'))
    .catch((error) => console.log(error));

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

const PORT = process.env.EXPRESS_APP_PORT_NUMBER || 8000;

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
