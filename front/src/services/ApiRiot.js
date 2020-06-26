import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `https://euw1.api.riotgames.com/tft`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      "X-Riot-Token": "RGAPI-1176630c-b77f-429c-bb41-5e3727d689f2"
    }
  })
}