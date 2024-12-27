const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
// Base de données simulée
let users = [
  { id: 1, name: "Marie", email: "marie@email.com" },
  { id: 2, name: "Pierre", email: "pierre@email.com" },
];

// GET tous les utilisateurs
router.get("/",(req,res) => {
	if (users.length === 0) {
		console.log("Aucun utilisateur trouvé");
		return res.status(404).json({ message: "Aucun utilisateur trouvé" });
	}
  res.json(users);
});

// GET un utilisateur par ID
router.get("/:id",
	(req,res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
	if (!user) {
		console.log("Utilisateur non trouvé");
		return res.status(404).json({ message: "Utilisateur non trouvé" })
	};
  res.json(user);
});

// POST nouvel utilisateur
router.post(
  "/",
  [body("name").notEmpty().trim(), body("email").isEmail()],
	(req,res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			errors.array().forEach(error => {
				console.log(error.path + ": " + error.msg);
			});
       return res.status(400).json({ errors: errors.array(), message: "Erreur de validation" });
     }
    const newUser = {
      id: users.length + 1,
      name: req.body.name,
      email: req.body.email,
    };
    users.push(newUser);
    res.status(201).json(newUser);
  }
);

// PUT modifier un utilisateur
router.put("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

  user.name = req.body.name;
  user.email = req.body.email;
  res.json(user);
});

// DELETE supprimer un utilisateur
router.delete("/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1)
    return res.status(404).json({ message: "Utilisateur non trouvé" });

  users.splice(userIndex, 1);
  res.status(204).send();
});

module.exports = router;
