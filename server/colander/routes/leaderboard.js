const express = require('express');
const router = express.Router();

const db = require('../colander/db');

/* GET leaderboard page. */
router.get('/leaderboard', (req, res, next) =>{
  db.getLeaderboard().then((data)=>{
    res.render('leaderboard', { title: 'Finden', leaderboardData: data });
  });
  
});

router.get('/leaderboardjson', (req, res, next)=>{
  db.getLeaderboard().then((data)=>{
    res.send(data);
  });
});

module.exports = router;