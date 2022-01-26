const express = require('express');
const routes = require('./routes/index');
const subroutes = require('./routes/subroutes')
const subdomain = require('express-subdomain');
const roster = require("./roster_machine");

const app = express();
app.set('view engine', 'ejs')
app.use(subdomain('book', subroutes));
app.use('/', routes)
app.use('/public/', express.static('public/'))

module.exports = app;