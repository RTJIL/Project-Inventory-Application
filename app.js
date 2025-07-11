import express from "express"
import expressLayouts from "express-ejs-layouts"
import { indexRouter } from "./routes/indexRouter.js"
import path from "node:path"
import dotenv from "dotenv"
import { fileURLToPath } from "url"

dotenv.config()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log("💡 views folder from env:", process.env.VIEWS_FOLDER)

const assetsPath = path.join(__dirname, process.env.VIEWS_FOLDER || "public")
app.use(express.static(assetsPath))

app.use(express.urlencoded({ extended: true }))

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "layout")

app.use("/", indexRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("🚀 Server started on port:", PORT)
})
