import express from "express"
import expressLayouts from "express-ejs-layouts"
import { indexRouter } from "./routes/indexRouter.js"
import path from "node:path"

import dotenv from "dotenv"
dotenv.config()

const app = express()

export const __dirname = import.meta.dirname

//serve static assets html,css etc
const assetsPath = path.join(__dirname, "public")
app.use(express.static(assetsPath))

//get info to body from form
app.use(express.urlencoded({ extended: true }))

//set ejs and use layout
app.set("views", [path.join(__dirname, "views")])
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "layout")

app.use("/", indexRouter)

const PORT = process.env.PGPORT || 5432
app.listen(PORT, () => {
  console.log("Server started on port: ", PORT)
})
