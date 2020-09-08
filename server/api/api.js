var axios = require("axios")

return function () {
  axios.create({
    baseURL: `http://tactip.net:8081/api`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    }
  })
}