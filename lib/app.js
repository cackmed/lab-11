const express = require('express');
const app = express();

app.use(express.json());

app.use(require('./routes/trips'));
app.use(require('./routes/itinerary'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
