const express = require('express');
const routes = require('./routes/index');
const subroutes = require('./routes/subroutes')
const subdomain = require('express-subdomain');

require('dotenv').config();
if (process.env.DISCORD_TOKEN) {
    const { fork } = require('node:child_process');
    const controller = new AbortController();
    const { signal } = controller;
    const child = fork('./roster_machine.js', ['child'], { signal }, { stdio: ['ignore', 'pipe', process.stderr] });
    child.on('error', (err) => {
        console.log('[DISCORD BOT] The bot has crashed. ERROR:', err)
    });
    child.on('exit', function (code, signal) {
        console.log('child process exited with ' +
            `code ${code} and signal ${signal}`);
    });
    child.on('message', (msg) => {
        global.roster = msg[0]
        global.support = msg[1]
    });
}

const app = express();
app.set('view engine', 'ejs')
app.use('/', routes)
app.use('/public/', express.static('public/'))

module.exports = app;