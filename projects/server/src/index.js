require("dotenv/config")
const express = require("express")
const cors = require("cors")
const { join } = require("path")
const db = require("./../models")

const authRouter = require("../router/auth")
const regionRouter = require("../router/region")
const warehouseRouter = require("../router/warehouse")
const admWarehouseRouter = require("../router/adminWarehouse")
const addressRouter = require("../router/address")
const apiValidator= require("../middlewares/apiValidatorMiddleware")

const PORT = process.env.PORT || 8000
const app = express()

// app.use(
//   cors({
//     origin: [
//       process.env.WHITELISTED_DOMAIN &&
//         process.env.WHITELISTED_DOMAIN.split(","),
//     ],
//   })
// )
app.use(cors())

app.use(express.json())
app.use(apiValidator.validateApi)
app.use(authRouter)
app.use(regionRouter)
app.use(warehouseRouter)
app.use(admWarehouseRouter)
app.use(addressRouter)

//#region API ROUTES

// ===========================
// NOTE : Add your routes here

// try {
//   db.sequelize.sync({ alter: true })
//   console.log("database connected")
// } catch (error) {
//   console.log(error)
// }

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
const clientPath = "../../client/build"
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
