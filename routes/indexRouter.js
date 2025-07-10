import { Router } from "express"
import indexController from "../controllers/indexController.js"

export const indexRouter = Router()

indexRouter.get("/", indexController.getMainPage)
indexRouter.get("/games-by-genres", indexController.getGenresPage)
indexRouter.get("/games-by-devs", indexController.getDevsPage)

indexRouter.get("/add-game", indexController.getGenresPage)
indexRouter.post("/add-game", indexController.getGenresPage)

indexRouter.get("/add-genre", indexController.getGenresPage)
indexRouter.post("/add-genre", indexController.getGenresPage)

indexRouter.get("/add-dev", indexController.getGenresPage)
indexRouter.post("/add-dev", indexController.getGenresPage)
