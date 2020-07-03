var _ = require("lodash")
var axios = require("axios")
const Bottleneck = require('bottleneck')
const riotKey = require('../riotApi.json')
const oldDatas = require('../datasTest.json')
const champs = require('./champions.json')
const itemsJson = require('./items.json')
var fs = require('fs')

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


  // const results = await Promise.all(allThePromises);
  const tempResults = await Promise.all(allThePromises.map(p => p.catch(e => e)));
  const results = tempResults.filter(result => !(result instanceof Error));
  puuidList = await getPuuidList(results)
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
    urlApi = "https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/" + encodeURI(name) + "/ids?count=30"
    return throttledGetMyData(urlApi)
  })


  // const results = await Promise.all(allThePromises);
  const tempResults = await Promise.all(allThePromises.map(p => p.catch(e => e)));
  const results = tempResults.filter(result => !(result instanceof Error));
  tempMatchList = await getMatchList(results)

  for (i = 0; i < tempMatchList.length; i++) {
    for (let j = 0; j < tempMatchList[i].length; j++) {
      if (!matchList.includes(tempMatchList[i][j])) {
        matchList.push(tempMatchList[i][j])
      }
    }
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

  // const results = await Promise.all(allThePromises);
  const tempResults = await Promise.all(allThePromises.map(p => p.catch(e => e)));
  const results = tempResults.filter(result => !(result instanceof Error));
  matchInfos = await getMatchInfosList(results)


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

  fs.open('datasTest.json', 'w', function (err, file) {
    if (err) throw err;
    console.log('Open!');
  })

  fs.writeFile('datasTest.json', JSON.stringify(unitsInfos), function (err) {
    if (err) throw err;
    console.log('Saved!');
  })

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
      var addItem = true

      for (let j = 0; j < tempData.items.length; j++) {
        if (tempData.items[j].name == units.items[i].name) {
          tempData.items[j].occurence += 1
          addItem = false
          break
        }
      }

      if (units.items[i] != 999 && addItem == true) {
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


  // const results = await Promise.all(allThePromises)
  const tempResults = await Promise.all(allThePromises.map(p => p.catch(e => e)));
  const results = tempResults.filter(result => !(result instanceof Error));
  bestPlayers = await getBestPlayersList(results)

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

async function getCarrysUsefulAndOthers(unitsInfos) {
  var carrys = []
  var useful = []
  var others = []
  const averageOccurence = await getAverageOccurence(unitsInfos)
  for (let i = 0; i < unitsInfos.length; i++) {
    if (unitsInfos[i].occurence > averageOccurence && unitsInfos[i].averageNbItems > 1.5) {
      carrys.push(unitsInfos[i])
    } else if (unitsInfos[i].averageNbItems > 1.5 || unitsInfos[i].occurence > averageOccurence) {
      useful.push(unitsInfos[i])
    } else {
      others.push(unitsInfos[i])
    }
  }

  var allChamps = []

  allChamps.push(carrys)
  allChamps.push(useful)
  allChamps.push(others)

  return allChamps
}

async function getAverageOccurence(unitsInfos) {
  var occurence = 0
  var count = 0

  for (let i = 0; i < unitsInfos.length; i++) {
    count += 1
    occurence += unitsInfos[i].occurence
  }

  return occurence / count
}

async function getBestItems(units) {
  var newCarrysInfos = []
  for (let i = 0; i < units.length; i++) {
    var index0 = 0
    var occurence0 = 0
    var index1 = 0
    var occurence1 = 0
    var index2 = 0
    var occurence2 = 0
    for (let j = 0; j < units[i].items.length; j++) {
      if (units[i].items[j].occurence > occurence0) {
        occurence0 = units[i].items[j].occurence
        index0 = j
      } else if (units[i].items[j].occurence > occurence1 || units[i].items[j].occurence == occurence0) {
        occurence1 = units[i].items[j].occurence
        index1 = j
      } else if (units[i].items[j].occurence > occurence2 || units[i].items[j].occurence == occurence1) {
        occurence2 = units[i].items[j].occurence
        index2 = j
      }
    }

    var tempData = {}
    tempData.champ = units[i].champ
    tempData.occurence = units[i].occurence
    tempData.averageNbItems = units[i].averageNbItems
    tempData.items = []
    for (let k = 0; k < units[i].items.length; k++) {
      if (k == index0 || k == index1 || k == index2) {
        tempData.items.push(units[i].items[k])
      }
    }

    newCarrysInfos.push(tempData)
  }

  return newCarrysInfos
}

function updateDatabase(units, carryBool) {
  for (let i = 0; i < units.length; i++) {
    itemsString = ""
    for (let j = 0; j < units[i].items.length; j++) {
      if (j == 0) {
        itemsString = JSON.stringify(units[i].items[j])
      } else {
        itemsString = itemsString + ";" + JSON.stringify(units[i].items[j])
      }
    }

    console.log(carryBool)
    axios.create({
        baseURL: `http://localhost:8081/api`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*'
        }
      })
      .put('/champions/' + units[i].champ, {
        carry: carryBool,
        items: itemsString,
        averageNbItems: units[i].averageNbItems,
        occurence: units[i].occurence
      })
  }
}

function createItemsInDB() {
  for (let i = 0; i < itemsJson.length; i++) {
    if (itemsJson[i].length == 1) {
      itemsJson[i] = '0' + itemsJson[i]
    }
    axios.create({
        baseURL: `http://localhost:8081/api`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*'
        }
      })
      .post('/items', {
        name: itemsJson[i].name,
        id: itemsJson[i].id
      })
  }
}



module.exports = {
  getNewDatas: async function (req, res) {
    console.log("Test 1")
    var playersName = await getBestPlayers()
    console.log("Test 2")

    // FOR TEST ONLY
    // playersName = playersName.slice(0, 200)
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

    const carrysUsefulAndOthers = await getCarrysUsefulAndOthers(matchInfosValues)
    console.log("Test 7")
    const bestItems = await getBestItems(carrysUsefulAndOthers[0])
    console.log("Test 8")
  },

  workWithOldDatas: async function (req, res) {
    // const carrysUsefulAndOthers = await getCarrysUsefulAndOthers(oldDatas)
    // console.log("Test 1")
    // const bestItemsCarrys = await getBestItems(carrysUsefulAndOthers[0])
    // const bestItemsUseful = await getBestItems(carrysUsefulAndOthers[1])
    // const bestItemsOthers = await getBestItems(carrysUsefulAndOthers[2])

    // console.log("Test 2")

    // console.log(bestItemsCarrys)

    // updateDatabase(bestItemsCarrys, 0)
    // updateDatabase(bestItemsUseful, 1)
    // updateDatabase(bestItemsOthers, 2)

    // console.log("Test 3")

    // createItemsInDB()
  }
}