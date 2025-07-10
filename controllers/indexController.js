const getMainPage = (req, res) => {
  res.render("filters/games")
}

const getGenresPage = (req, res) => {
  res.render("filters/games-by-genres")
}

const getDevsPage = (req, res) => {
  res.render("filters/games-by-devs")
}

export default {
  getMainPage,
  getGenresPage,
  getDevsPage,
}
