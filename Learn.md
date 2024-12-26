# Module 1 : TypeScript Fondamentaux

## Cours 1.1 : Introduction aux types de base

### Types primitifs

#### String
```typescript
// Déclaration de chaînes de caractères
let name: string = "John";
let greeting: string = `Hello ${name}`;

// Méthodes utiles
const upperName = name.toUpperCase();
const hasA: boolean = name.includes('a');
```

#### Number
```typescript
// Déclaration de nombres
let age: number = 25;
let price: number = 99.99;

// Opérations mathématiques typées
const total: number = price * 1.2; // avec TVA
```

#### Boolean
```typescript
// Déclaration de booléens
let isActive: boolean = true;
let isLoggedIn: boolean = false;

// Opérations logiques
const canAccess: boolean = isActive && isLoggedIn;
```

#### Arrays
```typescript
// Déclaration de tableaux
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["John", "Jane"];

// Méthodes de tableau avec typage
const doubledNumbers = numbers.map((n: number): number => n * 2);
```

#### Tuple
```typescript
// Définition d'un tuple
let userInfo: [string, number] = ["John", 25];

// Destructuration typée
const [userName, userAge] = userInfo;
```

### Exercice pratique guidé
Créons une fonction de validation d'email :

```typescript
function isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utilisation
const testEmail: string = "test@example.com";
console.log(isValidEmail(testEmail)); // true
```

## Cours 1.2 : Interfaces et Types

### Interfaces basiques
```typescript
interface User {
    id: number;
    name: string;
    email: string;
    age?: number; // Propriété optionnelle
}

// Utilisation de l'interface
const user: User = {
    id: 1,
    name: "John",
    email: "john@example.com"
};
```

### Types personnalisés
```typescript
// Type union
type Status = "active" | "inactive" | "pending";

// Type avec union
type UserStatus = {
    userId: number;
    status: Status;
    lastActive: Date;
};

// Utilisation
const userStatus: UserStatus = {
    userId: 1,
    status: "active",
    lastActive: new Date()
};
```

### Héritage d'interfaces
```typescript
interface BaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

interface Product extends BaseEntity {
    name: string;
    price: number;
    description?: string;
}

// Utilisation
const product: Product = {
    id: 1,
    name: "Laptop",
    price: 999.99,
    createdAt: new Date(),
    updatedAt: new Date()
};
```

## Cours 1.3 : Génériques

### Fonctions génériques basiques
```typescript
// Fonction générique simple
function identity<T>(arg: T): T {
    return arg;
}

// Utilisation
const numberResult = identity<number>(42);
const stringResult = identity("Hello");
```

### Classes génériques
```typescript
class Queue<T> {
    private data: T[] = [];

    push(item: T): void {
        this.data.push(item);
    }

    pop(): T | undefined {
        return this.data.shift();
    }
}

// Utilisation
const numberQueue = new Queue<number>();
numberQueue.push(1);
numberQueue.push(2);
```

# Module 2 : React avec TypeScript

## Cours 2.1 : Composants React TypeScript

### Composants fonctionnels typés
```typescript
interface UserCardProps {
    name: string;
    email: string;
    age?: number;
    onEdit: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ name, email, age, onEdit }) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>{email}</p>
            {age && <p>Age: {age}</p>}
            <button onClick={() => onEdit(1)}>Edit</button>
        </div>
    );
};
```

### Hooks typés
```typescript
const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/user');
                const data: User = await response.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : user ? (
                <UserCard {...user} onEdit={handleEdit} />
            ) : (
                <p>No user found</p>
            )}
        </div>
    );
};
```

# Module 3 : Node.js avec TypeScript

## Cours 3.1 : Configuration et API REST

### Configuration Express avec TypeScript
```typescript
import express, { Express, Request, Response, NextFunction } from 'express';

const app: Express = express();

// Middleware typé
const logger = (req: Request, res: Response, next: NextFunction): void => {
    console.log(`${req.method} ${req.path}`);
    next();
};

app.use(logger);

// Route typée
app.get('/api/users', async (req: Request, res: Response) => {
    try {
        const users: User[] = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
```

### Middleware d'authentification
```typescript
interface AuthRequest extends Request {
    user?: User;
}

const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'No token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded as User;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
```

### Gestion des erreurs typée
```typescript
interface AppError extends Error {
    statusCode?: number;
}

const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

app.use(errorHandler);
```

## Exercices pratiques conseillés pour chaque section

1. Pour les types de base :
   - Créer un système de validation de formulaire
   - Implémenter un parseur de données JSON typé
   - Développer une classe de manipulation de dates

2. Pour les interfaces et types :
   - Modéliser un système de blog complet
   - Créer un système de permissions
   - Implémenter un gestionnaire d'états

3. Pour React :
   - Créer un formulaire multi-étapes typé
   - Développer un système de filtres complexe
   - Implémenter un tableau de données avec tri et pagination

4. Pour Node.js :
   - Créer une API REST complète
   - Implémenter un système d'authentification JWT
   - Développer un système de logging typé
