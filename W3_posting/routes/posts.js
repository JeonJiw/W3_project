const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
	res.send('this is home page');
});

router.get('/about', (req, res) => {
	res.send('this is about page');
});


module.exports = router;