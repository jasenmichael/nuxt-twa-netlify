const axios = require('axios')

axios.get("https://jasenmichael.tumblr.com/api/read/json", {
    method: 'GET',
    redirect: 'follow',
    "Content-Type": "text/plain"
  })
  .then(res => res.data)
  .then(txt => {
    let data = JSON.parse(txt.replace('var tumblr_api_read = ', '').replace('};', '}'))
    console.log(data)
  })
  .catch(error => console.log('error', error))

// const fetch = require('node-fetch')

// fetch("https://jasenmichael.tumblr.com/api/read/json", {
//     method: 'GET',
//     redirect: 'follow',
//     headers: {"Content-Type": "text/plain"},
//     "mode": "cors"
//   })
//   .then(res => res.text())
//   .then(txt => {
//     let data = JSON.parse(txt.replace('var tumblr_api_read = ', '').replace('};', '}'))
//     console.log(data)
//   })
//   .catch(error => console.log('error', error))

