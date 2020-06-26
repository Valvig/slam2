'use strict';
const axios = require('axios')

exports.getChall = async function (req, res) {
  let config = {
    method: "get",
    url: "https://euw1.api.riotgames.com/tft/league/v1/challenger",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "X-Riot-Token": "RGAPI-b3c86c8d-f696-4f7b-b4f5-ce47409c73fb"
    }
  }

  const temp = await axios(config)
    .then(response => {
      return response.data.entries
    })
    .catch(error => {
      console.log(error)
    })

  return temp
}

exports.getGM = async function (req, res) {
  let config = {
    method: "get",
    url: "https://euw1.api.riotgames.com/tft/league/v1/grandmaster",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "X-Riot-Token": "RGAPI-b3c86c8d-f696-4f7b-b4f5-ce47409c73fb"
    }
  };

  const temp = await axios(config)
    .then(response => {
      return response.data.entries
    })
    .catch(error => {
      console.log(error);
    })

  return temp
}

exports.getMasters = async function (req, res) {
  let config = {
    method: "get",
    url: "https://euw1.api.riotgames.com/tft/league/v1/master",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "X-Riot-Token": "RGAPI-b3c86c8d-f696-4f7b-b4f5-ce47409c73fb"
    }
  };

  const temp = await axios(config)
    .then(response => {
      return response.data.entries
    })
    .catch(error => {
      console.log(error);
    })

  return temp
}

exports.getPuuid = async function (req, res) {
  let config = {
    method: "get",
    url: "https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-name/" + req.params.name,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "X-Riot-Token": "RGAPI-b3c86c8d-f696-4f7b-b4f5-ce47409c73fb"
    }
  };

  const temp = await axios(config)
    .then(response => {
      return response.data.puuid
    })
    .catch(error => {
      console.log(error)
    })

  return temp
}

exports.getMatchsForPuuid = async function (req, res) {
  let config = {
    method: "get",
    url: "https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/" + req.params.puuid + "/ids?count=45",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "X-Riot-Token": "RGAPI-b3c86c8d-f696-4f7b-b4f5-ce47409c73fb"
    }
  };

  const temp = await axios(config)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error);
    })

  res.send(temp)
}

exports.getMatchInfo = async function (req, res) {
  let config = {
    method: "get",
    url: "https://europe.api.riotgames.com/tft/match/v1/matches/" + req.params.matchId,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "X-Riot-Token": "RGAPI-b3c86c8d-f696-4f7b-b4f5-ce47409c73fb"
    }
  };

  const temp = await axios(config)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error);
    })

  res.send(temp)
}