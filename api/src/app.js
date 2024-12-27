const express = require("express");
const userRoutes = require("./routes/userRoutes");
const todosRoutes = require("./routes/todosRoutes");
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Route de base
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur mon API !" });
});

// Utilisation des routes
app.use('/api/users',userRoutes);
app.use('/api/todos',todosRoutes);

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Une erreur est survenue !",
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
