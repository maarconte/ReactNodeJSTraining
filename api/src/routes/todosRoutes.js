const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

let todos = [
  { id: 1, title: "Faire les courses", completed: false },
  { id: 2, title: "Acheter du pain", completed: true },
];

router.get("/", (req, res) => {
  if (todos.length === 0) {
    console.log("Aucune tâche trouvée");
    return res.status(404).json({ message: "Aucune tâche trouvée" });
  }
  res.json(todos);
});

router.get("/:id",(req,res) => {
	  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) {
	console.log("Tâche non trouvée");
	return res.status(404).json({ message: "Tâche non trouvée" });
  }
  res.json(todo);
});

router.post("/",[body("title").notEmpty().trim()],(req,res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		errors.array().forEach(error => {
			console.log(error.path + ": " + error.msg);
		});
		return res.status(400).json({ errors: errors.array(), message: "Erreur de validation" });
	}
	const newTodo = {
		id: todos.length + 1,
		title: req.body.title,
		completed: false
	};
	todos.push(newTodo);
	res.status(201).json(newTodo);
});

router.put("/:id", (req, res) => {
	const todo = todos.find((t) => t.id === parseInt(req.params.id));
	if (!todo) return res.status(404).json({ message: "Tâche non trouvée" });
	todo.title = req.body.title;
	todo.completed = req.body.completed;
	res.json(todo);
});

router.delete("/:id",(req,res) => {
	const todo = todos.find((t) => t.id === parseInt(req.params.id));
	if (!todo) return res.status(404).json({ message: "Tâche non trouvée" });
	todos = todos.filter((t) => t.id !== parseInt(req.params.id));
	res.json(todo);
});
