//indexRouter.js

import { Router } from "express"
import indexController from "../controllers/indexController.js"

export const indexRouter = Router()

indexRouter.get("/", indexController.getMainPage)
indexRouter.post("/:id/delete", indexController.postDeleteGame)

indexRouter.get("/:id/edit", indexController.getEditGame)
indexRouter.post("/:id/edit", indexController.postEditGame)

indexRouter.get("/games-by-genres", indexController.getGenresPage)
indexRouter.get("/games-by-genres/:genreId", indexController.getGamesByGenre)

indexRouter.get("/games-by-devs", indexController.getDevsPage)
indexRouter.get("/games-by-devs/:devId", indexController.getGamesByDev)

indexRouter.get("/add-game", indexController.getAddGame)
indexRouter.post("/add-game", indexController.postGame)

indexRouter.get("/add-genre", indexController.getAddGenre)
indexRouter.post("/add-genre", indexController.postGenre)

indexRouter.get("/add-dev", indexController.getAddDev)
indexRouter.post("/add-dev", indexController.postDev)
