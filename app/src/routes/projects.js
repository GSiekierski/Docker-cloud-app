const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM projects ORDER BY id");
  res.render("projects/list", { projects: rows });
});
router.get("/new", (req, res) => {
  res.render("projects/form", { project: null });
});
router.post("/", async (req, res) => {
  const { name, description } = req.body;
  await db.query("INSERT INTO projects(name, description) VALUES ($1, $2)", [name, description || ""]);
  res.redirect("/projects");
});
router.get("/:id/edit", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM projects WHERE id=$1", [req.params.id]);
  res.render("projects/form", { project: rows[0] });
});
router.post("/:id", async (req, res) => {
  const { name, description } = req.body;
  await db.query("UPDATE projects SET name=$1, description=$2 WHERE id=$3", [
    name, description || "", req.params.id
  ]);
  res.redirect("/projects");
});
router.post("/:id/delete", async (req, res) => {
  await db.query("DELETE FROM projects WHERE id=$1", [req.params.id]);
  res.redirect("/projects");
});
module.exports = router;