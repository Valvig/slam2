const express = require('express')
const router = express.Router()
const riotApiController = require('./riotApi.controller');

// ------ Retrieve Best Players ------
// CHALLENGER
router.get('/getChall', riotApiController.getChall)
// GRAND MASTER
router.get('/getGM', riotApiController.getGM)
// MASTER
router.get('/getMasters', riotApiController.getMasters)

// ------ Retrieve Players Infos ------
router.get('/getByName/:name', riotApiController.getPuuid)

// ------ Retrieve Match's Player ------
router.get('/getMatchsForPuuid/:puuid', riotApiController.getMatchsForPuuid)

// ------ Retrieve Match Infos ------
router.get('/getMatchInfo/:matchId', riotApiController.getMatchInfo)

module.exports = router