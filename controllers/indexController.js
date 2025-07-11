// indexController.js

import db from "../models/queries.js"

const getMainPage = async (req, res) => {
  const games = await db.getAllGames()

  console.log(games)
  console.log("---")

  const firstSegment = req.path.split("/")[1]
  res.render("filters/games", { active: firstSegment, games: games })
}

const postDeleteGame = async (req, res) => {
  try {
    console.log("Deleting game: ", req.params.id, "...")
    await db.deleteGame(req.params.id)
    console.log("✅Game Deleted")

    res.redirect("/")
  } catch (err) {
    console.error("❌ Failed to delete game:", err.message)
    res.status(500).send("Failed to delete game")
  }
}

const getEditGame = async (req, res) => {
  try {
    const genres = await db.getAllGenres()
    const devs = await db.getAllDevs()

    const games = await db.getGamesBy({ id: req.params.id })
    const game = games[0]

    if (!game) {
      return res.status(404).send("Game not found")
    }

    console.log(game)
    console.log("---")

    const firstSegment = req.path.split("/")[1]
    res.render("forms/edit-game", {
      active: firstSegment,
      game,
      allGenres: genres,
      allDevs: devs
    })
  } catch (err) {
    console.error("❌ Error fetching game:", err.message)
    res.status(500).send("Error loading game.")
  }
}

const postEditGame = async (req, res) => {
  const { title, genres, devs } = req.body

  console.log(req.body)

  const cleanGenres = Array.isArray(genres) ? genres : [genres]
  const cleanDevs = Array.isArray(devs) ? devs : [devs]

  try {
    console.log("Editing game: ", req.params.id, "...")
    await db.editGame(req.params.id, title, JSON.stringify(cleanGenres), JSON.stringify(cleanDevs))
    console.log("✅ Game Edited")
    console.log("---")

    res.redirect("/")
  } catch (err) {
    console.error("❌ Failed to edit game:", err.message)
    res.status(500).send("Failed to edit game")
  }
}


const getGenresPage = async (req, res) => {
  const genres = await db.getAllGenres()

  console.log("Genres: ", genres)
  console.log("---")

  const firstSegment = req.path.split("/")[1]
  res.render("filters/games-by-genres", {
    active: firstSegment,
    genres: genres,
  })
}

const getGamesByGenre = async (req, res) => {
  const { genreId } = req.params
  const genre = genreId.charAt(0).toUpperCase() + genreId.slice(1)
  const firstSegment = req.path.split("/")[1]

  console.log("🔍 Games by genre:", genre)
  console.log("---")

  try {
    const games = await db.getGamesBy({ genre })
    console.log("🎮 Games found:", games)
    res.render("filteredGames", { active: firstSegment, games })
  } catch (err) {
    console.error("❌ Failed to search game by genre:", err.message)
    res.status(500).send("Error searching game by genre.")
  }
}

const getDevsPage = async (req, res) => {
  const devs = await db.getAllDevs()

  console.log("Devs: ", devs)
  console.log("---")

  const firstSegment = req.path.split("/")[1]
  res.render("filters/games-by-devs", { active: firstSegment, devs: devs })
}

const getGamesByDev = async (req, res) => {
  const { devId } = req.params
  const dev = devId.charAt(0).toUpperCase() + devId.slice(1)
  const firstSegment = req.path.split("/")[1]

  console.log("🔍 Games by dev:", dev)
  console.log("---")

  try {
    const games = await db.getGamesBy({ dev })
    console.log("🎮 Games found:", games)
    res.render("filteredGames", { active: firstSegment, games })
  } catch (err) {
    console.error("❌ Failed to search game by dev:", err.message)
    res.status(500).send("Error searching game by dev.")
  }
}

const getAddGame = async (req, res) => {
  const genres = await db.getAllGenres()
  const devs = await db.getAllDevs()

  console.log("Genres: ", genres)
  console.log("Devs: ", devs)
  console.log("---")

  const firstSegment = req.path.split("/")[1]
  res.render("forms/add-game", {
    active: firstSegment,
    genres: genres,
    devs: devs,
  })
}

const postGame = async (req, res) => {
  const { title, genres, devs } = req.body

  console.log("Adding game with values: ", req.body, "...")

  try {
    await db.postGame(title, genres, devs)

    console.log("✅Game added")
    console.log("---")

    res.redirect("/")
  } catch (err) {
    console.error("❌ Failed to add game:", err.message)
    console.log("---")

    res.status(500).send("Error adding game.")
  }
}

const getAddGenre = (req, res) => {
  const firstSegment = req.path.split("/")[1]
  res.render("forms/add-genre", { active: firstSegment })
}

const postGenre = async (req, res) => {
  const { genre } = req.body

  console.log("Adding genre: ", genre, "...")
  try {
    await db.postGenre(genre)

    console.log("✅ Genre added to DB")
    console.log("---")

    res.redirect("/games-by-genres")
  } catch (err) {
    console.error("❌ Failed to add genre:", err.message)
    console.log("---")
    res.status(500).send("Something went wrong.")
  }
}

const getAddDev = (req, res) => {
  const firstSegment = req.path.split("/")[1]
  res.render("forms/add-dev", { active: firstSegment })
}

const postDev = async (req, res) => {
  const { dev } = req.body

  console.log("Adding dev: ", dev, "...")
  try {
    await db.postDev(dev)

    console.log("✅ Dev added to DB")
    console.log("---")

    res.redirect("/games-by-devs")
  } catch (err) {
    console.error("❌Failed to add dev: ", err.message)
    console.log("---")
    res.status(500).send("Something went wrong")
  }
}

export default {
  getMainPage,
  postDeleteGame,
  getEditGame,
  postEditGame,
  getGenresPage,
  getGamesByGenre,
  getDevsPage,
  getGamesByDev,
  getAddGame,
  postGame,
  getAddGenre,
  postGenre,
  getAddDev,
  postDev,
}
