import { pool } from "../db/db.js"

async function getAllGames() {
  const SQL = `SELECT * FROM games`

  const result = await pool.query(SQL)
  return result.rows
}

async function getGamesBy(value) {
  const column = value.dev ? "devs" : value.genre ? "genres" : "id"
  const searchTerm = value.dev || value.genre || value.id

  let SQL;
  let params;

  if (column === "id") {
    SQL = `SELECT * FROM games WHERE ${column} = $1`;
    params = [searchTerm];
  } else {
    SQL = `SELECT * FROM games WHERE ${column} @> $1::jsonb`;
    params = [JSON.stringify([searchTerm])];
  }

  const result = await pool.query(SQL, params)
  return result.rows
}

async function postGame(title, genres, devs) {
  const SQL = `INSERT INTO games (title, genres, devs) VALUES ($1, $2, $3)`
  await pool.query(SQL, [title, JSON.stringify(genres), JSON.stringify(devs)])
}

async function deleteGame(id) {
  const SQL = `DELETE FROM games WHERE id = $1`
  await pool.query(SQL, [id])
}

async function editGame(id, title, genres, devs) {
  const SQL = `
  UPDATE games 
  SET title = $1, genres = $2::jsonb, devs = $3::jsonb
  WHERE id = $4
  `

  await pool.query(SQL, [title, genres, devs, id])
}

async function getAllGenres() {
  const SQL = `SELECT * FROM genres`
  /* const like = `%${genreId}%` */

  const result = await pool.query(SQL)

  return result.rows
}

async function postGenre(genre) {
  const SQL = `INSERT INTO genres (name) VALUES ($1)`
  await pool.query(SQL, [genre])
}

async function getAllDevs() {
  const SQL = `SELECT * FROM devs`
  /* const like = `%${devId}%` */

  const result = await pool.query(SQL)

  return result.rows
}

async function postDev(dev) {
  const SQL = `INSERT INTO devs (name) VALUES ($1)`
  await pool.query(SQL, [dev])
}

export default {
  getAllGames,
  getGamesBy,
  postGame,
  deleteGame,
  editGame,
  getAllGenres,
  postGenre,
  getAllDevs,
  postDev,
}
