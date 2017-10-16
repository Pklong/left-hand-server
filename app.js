require("dotenv").config({ path: "./config.env" })
const express = require("express")
const path = require("path")
const app = express()
const axios = require("axios")

app.use(express.static("frontend/dist"))

app.get("/auth", (req, res) => {
  axios
    .post("https://github.com/login/oauth/access_token", {
      client_id: process.env.Client_ID,
      client_secret: process.env.Client_Secret,
      code: req.query.code
    })
    .then(ghResponse => {
      const accessToken = new RegExp(/^access_token=(\w+)/).exec(
        ghResponse.data
      )[1]
      res.end(accessToken)
    })
    .catch(e => {
      console.log(e.message)
      res.end(e)
    })
})

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"))
})
app.listen(process.env.PORT, () => console.log(`listening ${process.env.PORT}`))
