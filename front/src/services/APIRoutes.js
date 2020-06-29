import Api from '@/services/Api'

export default {
  async getAllChamp() {
    const temp = Api()
      .get('/champions')
      .then(function (res) {
        return res.data
      })

    return temp
  },
  createChamp(champion) {
    Api()
      .post('/champions', {
        name: champion.name,
        cost: champion.cost,
        traits: champion.traits,
        items: champion.items,
        carry: champion.carry,
      });
  },
  findChampByName(name) {
    Api()
      .get('/champions/' + name)
      .then(function (res) {
        return res.data
      })
  },
  updateChamp(champion) {
    Api()
      .put('/champions/' + champion.name, {
        name: champion.name,
        cost: champion.cost,
        traits: champion.traits,
        items: champion.items,
        carry: champion.carry,
      })
  },
  createItem(item) {
    Api()
      .post('/items', {
        name: item.name
      })
  },
  async getAllItems() {
    const temp = Api()
      .get('/items')
      .then(function (res) {
        return res.data
      })

    return temp
  },
  async getGMList() {
    const temp = await Api()
      .get('/riot/getGM')
      .then(function (res) {
        return res
      })
    return temp
  },
  async getPuuidByName (namePlayer) {
    const temp = await Api()
      .get('/riot/getByName/' + namePlayer)
      .then(function (res) {
        return res
      })
    return temp
  },
  async getMatchsForPuuid (puuid) {
    const temp = await Api()
      .get('/riot/getMatchsForPuuid/' + puuid)
      .then(function (res) {
        return res
      })
    return temp
  },
  async getMatchInfo (matchId) {
    const temp = await Api()
      .get('/riot/getMatchInfo/' + matchId)
      .then(function (res) {
        return res
      })
    return temp
  }
}