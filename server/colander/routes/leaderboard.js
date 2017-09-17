const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/leaderboard', function(req, res, next) {
  res.render('leaderboard', { title: 'Express' });
});

module.exports = router;