# Tutoriel Node.js et API REST pour Débutants

## 1. Introduction à Node.js

### Qu'est-ce que Node.js ?
Node.js est un environnement d'exécution JavaScript côté serveur. En termes simples, il permet d'exécuter du code JavaScript en dehors du navigateur web. Voici ses principaux avantages :

- **Asynchrone** : Peut gérer plusieurs opérations simultanément
- **Rapide** : Utilise le moteur V8 de Google Chrome
- **Grande communauté** : Beaucoup de packages disponibles via npm
- **Cross-platform** : Fonctionne sur Windows, Mac et Linux

### Installation de Node.js
1. Téléchargez Node.js sur le site officiel : https://nodejs.org
2. Choisissez la version LTS (Long Term Support)
3. Suivez les étapes d'installation

Pour vérifier l'installation, ouvrez un terminal et tapez :
```bash
node --version
npm --version
```

## 2. Les Bases de Node.js

### Premier programme Node.js
Créez un fichier `app.js` :
```javascript
console.log("Bonjour Node.js !");

// Utilisation de modules intégrés
const os = require('os');
console.log(`Votre système d'exploitation : ${os.platform()}`);
```

Pour exécuter :
```bash
node app.js
```

### NPM (Node Package Manager)
NPM est le gestionnaire de packages de Node.js. Il permet d'installer et gérer des bibliothèques.

Initialiser un projet :
```bash
npm init
```
Cela crée un fichier `package.json` qui contient les informations de votre projet.

## 3. Comprendre les API REST

### Qu'est-ce qu'une API REST ?
Une API REST (Representational State Transfer) est une interface qui permet à différents systèmes de communiquer via HTTP. Elle utilise :

- Des **méthodes HTTP** (GET, POST, PUT, DELETE)
- Des **URLs** (endpoints)
- Des **données** (généralement en format JSON)

### Méthodes HTTP principales :
- **GET** : Récupérer des données
- **POST** : Créer de nouvelles données
- **PUT** : Mettre à jour des données existantes
- **DELETE** : Supprimer des données

### Format d'URL REST typique :
- GET /api/users : Récupérer tous les utilisateurs
- GET /api/users/123 : Récupérer l'utilisateur avec l'ID 123
- POST /api/users : Créer un nouvel utilisateur
- PUT /api/users/123 : Mettre à jour l'utilisateur 123
- DELETE /api/users/123 : Supprimer l'utilisateur 123

## 4. Créer une API REST avec Express

### Installation d'Express
Express est un framework web pour Node.js qui simplifie la création d'API.

```bash
npm install express
npm install nodemon --save-dev
```

### Structure du projet
```
mon-api/
  ├── node_modules/
  ├── src/
  │   ├── routes/
  │   │   └── userRoutes.js
  │   ├── controllers/
  │   │   └── userController.js
  │   ├── models/
  │   │   └── userModel.js
  │   └── app.js
  ├── package.json
  └── .gitignore
```

### Configuration de base (app.js)
```javascript
const express = require('express');
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
    res.json({ message: "Bienvenue sur mon API !" });
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
```

### Création de routes (userRoutes.js)
```javascript
const express = require('express');
const router = express.Router();

// Base de données simulée
let users = [
    { id: 1, name: "Marie", email: "marie@email.com" },
    { id: 2, name: "Pierre", email: "pierre@email.com" }
];

// GET tous les utilisateurs
router.get('/', (req, res) => {
    res.json(users);
});

// GET un utilisateur par ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
});

// POST nouvel utilisateur
router.post('/', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT modifier un utilisateur
router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    
    user.name = req.body.name;
    user.email = req.body.email;
    res.json(user);
});

// DELETE supprimer un utilisateur
router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: "Utilisateur non trouvé" });
    
    users.splice(userIndex, 1);
    res.status(204).send();
});

module.exports = router;
```

### Intégration des routes (app.js)
```javascript
const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Utilisation des routes
app.use('/api/users', userRoutes);
```

## 5. Test de l'API

### Utilisation de Postman
1. Téléchargez et installez Postman
2. Créez une nouvelle collection pour vos tests
3. Testez chaque endpoint :

GET tous les utilisateurs :
```
GET http://localhost:3000/api/users
```

Créer un utilisateur :
```
POST http://localhost:3000/api/users
Body:
{
    "name": "Sophie",
    "email": "sophie@email.com"
}
```

## 6. Bonnes Pratiques

### Gestion des Erreurs
```javascript
// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Une erreur est survenue !",
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});
```

### Validation des Données
Installation de express-validator :
```bash
npm install express-validator
```

Exemple d'utilisation :
```javascript
const { body, validationResult } = require('express-validator');

router.post('/', [
    body('name').notEmpty().trim(),
    body('email').isEmail(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // ... reste du code
});
```

### Variables d'Environnement
Installation de dotenv :
```bash
npm install dotenv
```

Création du fichier `.env` :
```
PORT=3000
NODE_ENV=development
```

## 7. Exercices Pratiques

1. Créez une API pour gérer une liste de tâches (todo list) avec :
   - Création de tâches
   - Marquage comme complété
   - Suppression de tâches
   - Liste des tâches par statut

2. Ajoutez une authentification basique avec :
   - Inscription d'utilisateur
   - Connexion
   - Protection des routes
