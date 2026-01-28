const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM users ORDER BY id");
  res.render("users/list", { users: rows });
});

router.get("/new", (req, res) => {
  res.render("users/form", { user: null });
});

router.post("/", async (req, res) => {
  const { name, email } = req.body;
  await db.query("INSERT INTO users(name, email) VALUES ($1, $2)", [name, email]);
  res.redirect("/users");
});

router.get("/:id/edit", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM users WHERE id=$1", [req.params.id]);
  res.render("users/form", { user: rows[0] });
});

router.post("/:id", async (req, res) => {
  const { name, email } = req.body;
  await db.query("UPDATE users SET name=$1, email=$2 WHERE id=$3", [name, email, req.params.id]);
  res.redirect("/users");
});

router.post("/:id/delete", async (req, res) => {
  await db.query("DELETE FROM users WHERE id=$1", [req.params.id]);
  res.redirect("/users");
});

module.exports = router;