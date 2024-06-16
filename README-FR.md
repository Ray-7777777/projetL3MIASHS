For english go see README.md/Pour anglais aller voir README.md

Dans angular-app/src/app/app.config.ts, vous devez mettre votre configuration Firebase, sinon toutes les fonctionnalités nécessitant une base de données ne fonctionneront pas.

# Presentation
Cette application web est issue d'un projet scolaire et est une première utilisation d'Angular qui permet de rendre des équa-
tions LaTeX à partir de leur écriture, et de fournir un tableau de bord interactif pour des comptes enseignants
et étudiants. Les fonctionnalitées spécifiques sont :

Créer des comptes utilisateur : Permettre aux enseignants et aux étudiants de s’inscrire et de
se connecter à l’application. 

Soumission d’équations : Permettre aux enseignants de soumettre des
équations LaTeX via l’application. 

Résolution des équations : Faciliter la résolution des équations
soumises par les étudiants. 

Affichage des équations résolues : Présenter les équations résolues et les
réponses correspondantes dans un format clair et accessible. 

Portée du Projet Le projet couvre les aspects suivants :

Gestion des utilisateurs : Système d’inscription, de connexion et de gestion des comptes pour les
enseignants et les étudiants. 

Soumission et rendu des équations : Interface permettant aux enseignants
de soumettre des équations en LaTeX et de les rendre dans un format visuel.

Interaction étudiant-enseignant : Tableau de bord pour les enseignants et les étudiants, permettant la soumission et la
résolution d’équations.

# npm install que vous devez effectuer pour que cette application fonctionne:

npm install -g @angular/cli   # Installer Angular CLI globalement

ng add @angular/material      # Installer Angular Material (optionnel)

npm install firebase @angular/fire  # Installer Firebase pour Angular

npm install bcryptjs          # Installer bcrypt.js pour le hachage de mot de passe

npm install @angular/platform-browser @angular/common @angular/forms @angular/router  # Installer les dépendances Angular nécessaires

# Présentation de chaque composant et de leurs fonctions :

**Composant latex-renderer**:

Le composant LatexRenderer permet de saisir, rendre et gérer des équations LaTeX. Il intègre MathJax pour le rendu des équations, et utilise Firestore pour stocker et gérer les équations. Les utilisateurs peuvent enregistrer de nouvelles équations, les sélectionner pour les rendre à nouveau, et supprimer des équations existantes.

***Variables*** :
  
equation: Stocke l'équation actuelle saisie par l'utilisateur.

renderedEquation: Stocke l'équation rendue sous forme de HTML sécurisé.

selectedEquation: Stocke l'équation sélectionnée pour le rendu.

equations: Tableau d'équations récupérées de Firestore.

firestore: Instance de Firestore pour les opérations de base de données.

router: Instance du routeur Angular pour la navigation.

saveMessage: Message pour afficher le statut des opérations de sauvegarde ou de suppression.

***Fonctions***:

ngOnInit:Cette fonction est appelée lors de l'initialisation du composant. Elle charge MathJax pour le rendu des équations et récupère les équations stockées dans Firestore.

loadMathJax:Cette fonction charge les scripts nécessaires pour MathJax afin de rendre les équations LaTeX.

renderEquation:Cette fonction rend l'équation saisie par l'utilisateur en LaTeX et sécurise le HTML rendu.

saveEquation:Cette fonction sauvegarde l'équation actuelle dans Firestore et met à jour la liste des équations.

deleteEquation:Cette fonction supprime une équation spécifique de Firestore et met à jour la liste des équations.

getEquations:Cette fonction récupère toutes les équations stockées dans Firestore et les retourne sous forme de tableau.

selectEquation:Cette fonction permet de sélectionner et de rendre une équation particulière.

navigateToLogin:Cette fonction permet de naviguer vers la page de connexion.

navigateToRegister:Cette fonction permet de naviguer vers la page d'inscription.


**Composant : Register**

Le composant Register permet aux utilisateurs de créer un compte en vérifiant les champs requis, en hachant le mot de passe pour des raisons de sécurité, et en stockant les informations dans Firestore. Après une inscription réussie, l'utilisateur est automatiquement connecté et redirigé vers le tableau de bord approprié en fonction de son type de compte.

**Variables** :
- id : Stocke le nom d'utilisateur choisi par l'utilisateur.
- password : Stocke le mot de passe choisi par l'utilisateur.
- accountType : Définit le type de compte (par défaut, 'student').
- registerMessage : Message pour afficher le statut de l'inscription.
- firestore : Instance de Firestore pour les opérations de base de données.
- router : Instance du routeur Angular pour la navigation.

**Fonctions** :

**register** : Cette fonction gère le processus d'inscription :
- Elle vérifie que les champs id et password ne sont pas vides.
- Elle hache le mot de passe avant de le stocker dans Firestore.
- Elle enregistre les informations de l'utilisateur (id, mot de passe haché, type de compte) dans Firestore.
- Si l'inscription est réussie, elle affiche un message de succès et redirige automatiquement l'utilisateur vers le tableau de bord approprié.
- Si une erreur survient, elle affiche un message d'erreur.

**logout** : Cette fonction redirige l'utilisateur vers le composant latex-renderer.

---

**Composant : Login**

Le composant Login permet aux utilisateurs de se connecter en vérifiant leurs identifiants avec ceux stockés dans Firestore. Il compare les mots de passe de manière sécurisée à l'aide de bcrypt et redirige les utilisateurs vers le tableau de bord approprié en fonction de leur type de compte (enseignant ou étudiant).

**Variables** :
- id : Stocke le nom d'utilisateur de l'utilisateur.
- password : Stocke le mot de passe de l'utilisateur.
- loginMessage : Message pour afficher le statut de la connexion.
- firestore : Instance de Firestore pour les opérations de base de données.
- router : Instance du routeur Angular pour la navigation.

**Fonctions** :

**login** : Cette fonction vérifie les identifiants de l'utilisateur :
- Elle récupère tous les documents de la collection 'users' dans Firestore.
- Elle compare le nom d'utilisateur fourni avec ceux stockés.
- Si un nom d'utilisateur correspondant est trouvé, elle compare le mot de passe haché.
- Si la comparaison est réussie, elle stocke les informations de l'utilisateur dans localStorage et redirige l'utilisateur vers le tableau de bord approprié.
- Si le nom d'utilisateur ou le mot de passe est incorrect, un message d'erreur est affiché.

**logout** : Cette fonction redirige l'utilisateur vers le composant latex-renderer.
