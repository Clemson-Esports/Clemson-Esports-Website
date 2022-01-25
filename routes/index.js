const express = require('express');
const router = express.Router();

/*
Adding a route:

Once you've created a page in views/<page>.ejs, you need to add a route to the view 
so NodeJS knows which page to serve the user.

For router.get:
- The first parameter is the string of the route you're trying to add.
  (for instance, '/about' would be accessed through 'clemsonesports.com/about',
  and 'index' resolves to /, or 'clemsonesports.com/')

For res.render:
- The parameter is the string name of the file in views/, without .ejs
- The object title will appear as "<title> | Clemson Esports" on the page.

Future development:
- One way to pass Discord roles to the rosters page is to create another parameter,
  maybe 'rosterInfo', into the object that title resides in for that page.
*/

router.get('/', (req, res) => { res.render('index', {title: "Home"}) });
router.get('/about', (req, res) => { res.render('about', {title: "About Us"}) });
router.get('/stream', (req, res) => { res.render('stream', {title: "Stream"}) });
router.get('/rosters', (req, res) => { res.render('rosters', {title: "Rosters"}) });
router.get('/events', (req, res) => { res.render('events', {title: "Upcoming Events"}) });
router.get('/contact', (req, res) => { res.render('contact', {title: "Contact Us"}) });
router.get('/discord', (req, res) => { res.render('discord', {title: "Join Us"}) });

module.exports = router;