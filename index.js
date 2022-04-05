require('dotenv').config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { getSystemErrorName } = require("util");
let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
    PORT = 8000;
}
const app = express();

app.use(cors());

app.get('/check', (req, res) => {
    const gameLetters = req.query.gameLetters
    const checkURL = "https://danielthepope-countdown-v1.p.rapidapi.com/solve/" + gameLetters
    const options = {
        method: 'GET',
        url: checkURL,
        params: {
            variance: '2'
        },
        headers: {
          'X-RapidAPI-Host': process.env.RAPID_API_HOST,
          'X-RapidAPI-Key': process.env.RAPID_API_KEY
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
          res.json(response.data)
      }).catch(function (error) {
          console.error(error);
      });
})

app.listen(PORT, () => console.log('Server is running on port ' + PORT))

