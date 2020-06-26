var _ = require("lodash")
var axios = require("axios")
var rateLimit = require('axios-rate-limit')
const riotApiController = require('../app/riotApi/riotApi.controller')
const Bottleneck = require('bottleneck');
const riotKey = require('../riotApi.json')

const limiter = new Bottleneck({
  minTime: 2 * 60 * 1000 / 95 // Max requests = 100 every 2 minutes
});


async function getMyData(urlApi) {
  const axiosConfig = {
    method: "get",
    url: urlApi,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "X-Riot-Token": riotKey.key
    }
  }

  return axios(axiosConfig)
}

const throttledGetMyData = limiter.wrap(getMyData);

async function getAllPuuid(playersName) {

  const urlList = []
  let puuidList = []

  for (let i = 0; i < playersName.length; i++) {
    urlList.push(playersName[i])
  }

  // Map over all the results and call our pretend API, stashing the promises in a new array
  const allThePromises = urlList.map(name => {
    urlApi = "https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-name/" + encodeURI(name)
    return throttledGetMyData(urlApi)
  })


  try {
    const results = await Promise.all(allThePromises);
    puuidList = await getPuuidList(results)
  } catch (err) {
    console.log(err)
  }

  return puuidList
}

async function getAllMatchs(puuidList) {
  const urlList = []
  let matchList = []

  for (let i = 0; i < puuidList.length; i++) {
    urlList.push(puuidList[i])
  }

  // Map over all the results and call our pretend API, stashing the promises in a new array
  const allThePromises = urlList.map(name => {
    urlApi = "https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/" + encodeURI(name) + "/ids?count=10"
    return throttledGetMyData(urlApi)
  })


  try {
    const results = await Promise.all(allThePromises);
    tempMatchList = await getMatchList(results)

    for (i = 0; i < tempMatchList.length; i++) {
      for (let j = 0; j < tempMatchList[i].length; j++) {
        if (!matchList.includes(tempMatchList[i][j])) {
          matchList.push(tempMatchList[i][j])
        }
      }
    }
  } catch (err) {
    console.log(err)
  }

  return matchList
}

async function getAllMatchsInfos(matchsList) {
  const urlList = []
  let matchInfos = []

  for (let i = 0; i < matchsList.length; i++) {
    urlList.push(matchsList[i])
  }

  // Map over all the results and call our pretend API, stashing the promises in a new array
  const allThePromises = urlList.map(matchId => {
    urlApi = "https://europe.api.riotgames.com/tft/match/v1/matches/" + encodeURI(matchId)
    return throttledGetMyData(urlApi)
  })


  try {
    const results = await Promise.all(allThePromises);
    matchInfos = await getMatchInfosList(results)
  } catch (err) {
    console.log(err)
  }

  return matchInfos
}

function getMatchList(results) {
  const matchList = []
  for (let i = 0; i < results.length; i++) {
    matchList.push(results[i].data)
  }
  return matchList
}

function getPuuidList(results) {
  const puuidList = []

  for (let i = 0; i < results.length; i++) {
    puuidList.push(results[i].data.puuid)
  }
  return puuidList
}

function getMatchInfosList(results) {
  const matchInfosList = []

  for (const result of results) {
    matchInfosList.push(result.data)
  }
  return matchInfosList
}

async function useMatchInfos(matchInfos) {
  // Date time today                          - 48 hours in milliseconds
  var yesterdaySeconds = new Date().getTime() - (48 * 60 * 60 * 1000)

  var unitsInfos = []

  for (const match of matchInfos) {
    // If date < 24h then go on
    if (match.info.game_datetime >= yesterdaySeconds) {
      // get placement 1
      for (let i = 0; i < match.info.participants.length; i++) {
        // get units of first one
        if (match.info.participants[i].placement == 1) {
          var player = match.info.participants[i]
          for (let j = 0; j < player.units.length; j++) {
            // put units in objects with items
            unitsInfos = addToList(unitsInfos, player.units[j])
          }
        }
      }
    }
  }

  console.log(JSON.stringify(unitsInfos))

  return unitsInfos
}

// Get the new infos of ITEMS for units
function getNewItemsInfos(unitsInfos, units) {

  // Check every items in unit 
  for (let j = 0; j < units.items.length; j++) {

    var add = true

    // Check every items in OUR units 
    for (let i = 0; i < unitsInfos.items.length; i++) {
      // IF same name then update items values
      if (unitsInfos.items[i].name === units.items[j]) {
        unitsInfos.items[i].occurence += 1
        add = false
      }
    }

    // Else adda new one
    if (add) {
      if (units.items[j] != 999) {
        unitsInfos.items.push({
          name: units.items[j],
          occurence: 1
        })
      }
    }
  }

  return unitsInfos
}

function addToList(unitsInfos, units) {
  var add = true

  for (let i = 0; i < unitsInfos.length; i++) {
    if (units.character_id === unitsInfos[i].champ) {
      unitsInfos[i] = getNewItemsInfos(unitsInfos[i], units)

      unitsInfos[i].averageNbItems = (unitsInfos[i].averageNbItems * unitsInfos[i].occurence + units.items.length) / (unitsInfos[i].occurence + 1)

      unitsInfos[i].occurence += 1

      add = false

      break
    }
  }

  if (add) {
    var tempData = {}
    tempData.champ = units.character_id
    tempData.occurence = 1
    tempData.averageNbItems = units.items.length
    tempData.items = []
    for (i = 0; i < units.items.length; i++) {
      if (units.items[i] != 99) {
        tempData.items.push({
          name: units.items[i],
          occurence: 1
        })
      }
    }

    unitsInfos.push(tempData)
  }

  return unitsInfos
}

async function getBestPlayers() {
  const urlList = []
  let bestPlayers = []

  urlList.push("https://euw1.api.riotgames.com/tft/league/v1/challenger")
  urlList.push("https://euw1.api.riotgames.com/tft/league/v1/grandmaster")
  urlList.push("https://euw1.api.riotgames.com/tft/league/v1/master")

  // Map over all the results and call our pretend API, stashing the promises in a new array
  const allThePromises = urlList.map(url => {
    return throttledGetMyData(url)
  })


  try {
    const results = await Promise.all(allThePromises);
    bestPlayers = await getBestPlayersList(results)
  } catch (err) {
    console.log(err)
  }

  return bestPlayers
}

async function getBestPlayersList(results) {
  const bestPlayersList = []

  for (let i = 0; i < results.length; i++) {
    for (let j = 0; j < results[i].data.entries.length; j++) {
      var entrie = results[i].data.entries
      bestPlayersList.push(entrie[j].summonerName)
    }
  }

  return bestPlayersList
}



module.exports = {
  test: async function (req, res) {
    console.log("Test 1")
    var playersName = await getBestPlayers()
    console.log("Test 2")

    // FOR TEST ONLY
    playersName = playersName.slice(0, 20)
    console.log("playersName.length = " + playersName.length)
    // FOR TEST ONLY

    const puuidList = await getAllPuuid(playersName)
    console.log("Test 3")
    let matchsList = await getAllMatchs(puuidList)
    console.log("matchsList.length = " + matchsList.length)
    console.log("Test 4")

    const matchsInfosList = await getAllMatchsInfos(matchsList)
    console.log("Test 5")

    const matchInfosValues = await useMatchInfos(matchsInfosList)
    console.log("Test 6")
  }
}