require("dotenv/config")
const express = require("express")
const cors = require("cors")
const { join } = require("path")
const userRouter = require("./../router/userRouter")
const addressRouter = require("./../router/addressRouter")
const rajaOngkirRouter = require("./../router/rajaOngkirRouter")
const {
  getGeolocation,
  getLocation,
  getRajaOngkirData,
} = require("./../api/api")
const db = require("./../models")
const PORT = process.env.PORT || 8000
const app = express()

// app.use(
//   cors({
//     origin: [
//       process.env.WHITELISTED_DOMAIN &&
//         process.env.WHITELISTED_DOMAIN.split(","),
//       "http://localhost:3000/",
//     ],
//     methods: "GET,POST,DELETE,PATCH",
//   })
// )

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  next()
})

app.use(
  cors({
    origin: [
      ...(process.env.WHITELISTED_DOMAIN
        ? process.env.WHITELISTED_DOMAIN.split(",")
        : []),
      "http://localhost:3000",
    ],
    methods: "GET,POST,DELETE,PATCH",
  })
)

app.use(express.json())
app.use(userRouter)
app.use(addressRouter)
app.use(rajaOngkirRouter)

//#region API ROUTES

// ===========================
// NOTE : Add your routes here

try {
  db.sequelize.sync({ alter: true })
  console.log("database connected")
} catch (error) {
  console.log(error)
}

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`)
})

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  })
})

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !")
  } else {
    next()
  }
})

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack)
    res.status(500).send("Error !")
  } else {
    next()
  }
})

//#endregion

//#region CLIENT
// const clientPath = "../../client/build"
const clientPath = "../client/build"

app.use(express.static(join(__dirname, clientPath)))

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"))
})

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`)
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`)
  }
})

getGeolocation("Dadap,Tangerang")
  .then((result) => {
    console.log("Geolocation: ", result)
  })
  .catch((error) => {
    console.error("Error :", error.message)
  })

getLocation(-6.0874339, 106.7071904)
  .then((result) => {
    console.log("Location : ", result)
  })
  .catch((error) => {
    console.error("Error : ", error.message)
  })

getRajaOngkirData("name=Bali", "province")
  .then((result) => {
    console.log("Province : ", result)
  })
  .catch((error) => {
    console.error("Error : ", error.message)
  })
