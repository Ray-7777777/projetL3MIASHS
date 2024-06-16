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

Composant latex-renderer:

Le composant LatexRenderer permet de saisir, rendre et gérer des équations LaTeX. Il intègre MathJax pour le rendu des équations, et utilise Firestore pour stocker et gérer les équations. Les utilisateurs peuvent enregistrer de nouvelles équations, les sélectionner pour les rendre à nouveau, et supprimer des équations existantes.

Variables et Constructeur:

  equation: string = '';
  renderedEquation: SafeHtml = '';
  selectedEquation: string = '';
  equations: { id: string, equation: string }[] = [];
  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router);
  saveMessage: string = '';

  constructor(private sanitizer: DomSanitizer) {}
  
equation: Stocke l'équation actuelle saisie par l'utilisateur.

renderedEquation: Stocke l'équation rendue sous forme de HTML sécurisé.

selectedEquation: Stocke l'équation sélectionnée pour le rendu.

equations: Tableau d'équations récupérées de Firestore.

firestore: Instance de Firestore pour les opérations de base de données.

router: Instance du routeur Angular pour la navigation.

saveMessage: Message pour afficher le statut des opérations de sauvegarde ou de suppression.


  async ngOnInit(): Promise<void> {
    this.loadMathJax();
    this.equations = await this.getEquations();
  }
  
ngOnInit:Cette fonction est appelée lors de l'initialisation du composant. Elle charge MathJax pour le rendu des équations et récupère les équations stockées dans Firestore.

\begin{verbatim}
loadMathJax() {
    const script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
    script.async = true;
    document.head.appendChild(script);

    const mathjaxScript = document.createElement('script');
    mathjaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    mathjaxScript.async = true;
    document.head.appendChild(mathjaxScript);
  }
\end{verbatim}
loadMathJax:Cette fonction charge les scripts nécessaires pour MathJax afin de rendre les équations LaTeX.

\begin{verbatim}
  renderEquation() {
    try {
      const tempElement = document.createElement('div');
      MathJax.texReset();
      tempElement.innerHTML = '$$' + this.equation + '$$';
      MathJax.typeset([tempElement]);
      this.renderedEquation = this.sanitizer.bypassSecurityTrustHtml(tempElement.innerHTML);
    } catch (err) {
      this.renderedEquation = this.sanitizer.bypassSecurityTrustHtml('<span class="error-message">Invalid LaTeX equation</span>');
    }
  }
\end{verbatim}
renderEquation:Cette fonction rend l'équation saisie par l'utilisateur en LaTeX et sécurise le HTML rendu.

\begin{verbatim}
  async saveEquation() {
    try {
      const docRef = await addDoc(collection(this.firestore, 'equations'), {
        equation: this.equation,
        timestamp: new Date()
      });
      console.log('Document written with ID: ', docRef.id);
      this.saveMessage = 'Equation saved successfully!';
      this.equations = await this.getEquations(); // Refresh equations list
    } catch (e) {
      console.error('Error adding document: ', e);
      this.saveMessage = 'Error saving equation. Please try again.';
    }
  }
\end{verbatim}
saveEquation:Cette fonction sauvegarde l'équation actuelle dans Firestore et met à jour la liste des équations.

\begin{verbatim}
  async deleteEquation(id: string) {
    try {
      await deleteDoc(doc(this.firestore, 'equations', id));
      console.log('Document with ID: ', id, ' deleted');
      this.saveMessage = 'Equation deleted successfully!';
      this.equations = await this.getEquations(); // Refresh equations list
    } catch (e) {
      console.error('Error deleting document: ', e);
      this.saveMessage = 'Error deleting equation. Please try again.';
    }
  }
\end{verbatim}
deleteEquation:Cette fonction supprime une équation spécifique de Firestore et met à jour la liste des équations.

\begin{verbatim}
  async getEquations() {
    const querySnapshot = await getDocs(collection(this.firestore, 'equations'));
    const equations: { id: string, equation: string }[] = [];
    querySnapshot.forEach((doc) => {
      equations.push({ id: doc.id, equation: doc.data()['equation'] });
    });
    return equations;
  }
\end{verbatim}
getEquations:Cette fonction récupère toutes les équations stockées dans Firestore et les retourne sous forme de tableau.

\begin{verbatim}
  selectEquation(equation?: string) {
    if (equation) {
      this.equation = equation;
    } else {
      this.equation = this.selectedEquation;
    }
    this.renderEquation();
  }
\end{verbatim}
selectEquation:Cette fonction permet de sélectionner et de rendre une équation particulière.

\begin{verbatim}
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
\end{verbatim}
navigateToLogin:Cette fonction permet de naviguer vers la page de connexion.


\begin{verbatim}
    navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
\end{verbatim}
navigateToRegister:Cette fonction permet de naviguer vers la page d'inscription.

\subsubsection{HTML du Composant}
\begin{verbatim}
<div>
  <h1>LaTeX Display</h1>
  <div>
    <h2>Rendered Equation:</h2>
    <div [innerHTML]="renderedEquation">
      <!-- LaTeX equations will be rendered here -->
    </div>
  </div>
  <div>
    <label for="input">Enter your LaTeX equation:</label>
    <input type="text" id="input" [(ngModel)]="equation" (ngModelChange)="renderEquation()">
  </div>
  <button (click)="saveEquation()">Enregistrer</button>
  <div *ngIf="saveMessage" class="save-message">{{ saveMessage }}</div>
  <div>
    <label for="equations">choose a formula:</label>
    <select id="equations" [(ngModel)]="selectedEquation" (change)="selectEquation()">
      <option *ngFor="let equation of equations" [value]="equation.equation">{{ equation.equation }}</option>
    </select>
  </div>
  <div *ngFor="let equation of equations">
    <div>{{ equation.equation }}</div>
    <button (click)="selectEquation(equation.equation)">Sélectionner</button>
    <button (click)="deleteEquation(equation.id)">Supprimer</button>
  </div>
    <!-- New buttons for login and register -->
    <div class="login-register-buttons">
      <button (click)="navigateToLogin()">Login</button>
      <button (click)="navigateToRegister()">Register</button>
    </div>
    
</div>
\end{verbatim}

