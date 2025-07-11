import { pool } from "./db.js"

const SQL = `
CREATE TABLE IF NOT EXISTS genres (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS devs (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS games (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genres JSONB,
  devs JSONB
);
`

;(async () => {
  try {
    await pool.query(SQL)
    console.log("✅ Tables created successfully!")
  } catch (err) {
    console.error("❌ Error creating tables:", err)
  }
})()
