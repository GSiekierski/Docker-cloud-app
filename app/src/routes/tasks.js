const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await db.query(`
    SELECT t.*, u.name AS user_name, p.name AS project_name
    FROM tasks t
    LEFT JOIN users u ON u.id = t.user_id
    LEFT JOIN projects p ON p.id = t.project_id
    ORDER BY t.id
  `);

  const users = await db.query("SELECT id, name FROM users ORDER BY id");
  const projects = await db.query("SELECT id, name FROM projects ORDER BY id");

  res.render("tasks/list", { tasks: tasks.rows, users: users.rows, projects: projects.rows });
});
router.get("/new", async (req, res) => {
  const users = await db.query("SELECT id, name FROM users ORDER BY id");
  const projects = await db.query("SELECT id, name FROM projects ORDER BY id");
  res.render("tasks/form", { task: null, users: users.rows, projects: projects.rows });
});
router.post("/", async (req, res) => {
  const { title, done, user_id, project_id } = req.body;
  await db.query(
    "INSERT INTO tasks(title, done, user_id, project_id) VALUES ($1, $2, $3, $4)",
    [
      title,
      done === "on",
      user_id ? Number(user_id) : null,
      project_id ? Number(project_id) : null
    ]
  );
  res.redirect("/tasks");
});
router.get("/:id/edit", async (req, res) => {
  const task = await db.query("SELECT * FROM tasks WHERE id=$1", [req.params.id]);
  const users = await db.query("SELECT id, name FROM users ORDER BY id");
  const projects = await db.query("SELECT id, name FROM projects ORDER BY id");
  res.render("tasks/form", { task: task.rows[0], users: users.rows, projects: projects.rows });
});
router.post("/:id", async (req, res) => {
  const { title, done, user_id, project_id } = req.body;
  await db.query(
    "UPDATE tasks SET title=$1, done=$2, user_id=$3, project_id=$4 WHERE id=$5",
    [
      title,
      done === "on",
      user_id ? Number(user_id) : null,
      project_id ? Number(project_id) : null,
      req.params.id
    ]
  );
  res.redirect("/tasks");
});
router.post("/:id/delete", async (req, res) => {
  await db.query("DELETE FROM tasks WHERE id=$1", [req.params.id]);
  res.redirect("/tasks");
});
module.exports = router;