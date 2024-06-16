For english go see README.md/Pour anglais aller voir README.md

Dans angular-app/src/app/app.config.ts, vous devez mettre votre configuration Firebase, sinon toutes les fonctionnalités nécessitant une base de données ne fonctionneront pas.

# Presentation
Cette application web est issue d'un projet scolaire et est une première utilisation d'Angular qui permet de rendre des équa-
tions LaTeX à partir de leur écriture, et de fournir un tableau de bord interactif pour des comptes enseignants
et étudiants. Les fonctionnalitées spécifiques sont :
Créer des comptes utilisateur : Permettre aux enseignants et aux étudiants de s’inscrire et de
se connecter à l’application. Soumission d’équations : Permettre aux enseignants de soumettre des
équations LaTeX via l’application. Résolution des équations : Faciliter la résolution des équations
soumises par les étudiants. Affichage des équations résolues : Présenter les équations résolues et les
réponses correspondantes dans un format clair et accessible. Portée du Projet Le projet couvre les
aspects suivants :
Gestion des utilisateurs : Système d’inscription, de connexion et de gestion des comptes pour les
enseignants et les étudiants. Soumission et rendu des équations : Interface permettant aux enseignants
de soumettre des équations en LaTeX et de les rendre dans un format visuel. Interaction étudiant-
enseignant : Tableau de bord pour les enseignants et les étudiants, permettant la soumission et la
résolution d’équations.

# npm install que vous devez effectuer pour que cette application fonctionne:

npm install -g @angular/cli   # Installer Angular CLI globalement

ng add @angular/material      # Installer Angular Material (optionnel)

npm install firebase @angular/fire  # Installer Firebase pour Angular

npm install bcryptjs          # Installer bcrypt.js pour le hachage de mot de passe

npm install @angular/platform-browser @angular/common @angular/forms @angular/router  # Installer les dépendances Angular nécessaires
