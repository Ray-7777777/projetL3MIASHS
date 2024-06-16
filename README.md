# projetL3MIASHS
For french go see README-FR.md/Pour français allait voir README-FR.md

In angular-app/src/app/app.config.ts, you must put your web app's Firebase configuration for it to work; otherwise, all functionalities requiring a database will not work.

# Presentation
This web application originates from a school project and serves as an initial use of Angular for rendering LaTeX equations from their notation, alongside providing an interactive dashboard for both teacher and student accounts. Specific functionalities include:

User Account Creation: Allowing teachers and students to register and log into the application.

Equation Submission: Enabling teachers to submit LaTeX equations through the application.

Equation Resolution: Facilitating resolution of equations submitted by students.

Display of Resolved Equations: Presenting resolved equations and corresponding answers in a clear and accessible format.

Project Scope:
The project covers the following aspects:

User Management: Registration, login, and account management system for teachers and students.

Equation Submission and Rendering: Interface for teachers to submit LaTeX equations and render them visually.

Teacher-Student Interaction: Dashboard for teachers and students, facilitating equation submission and resolution.

# npm install you need to do for this application to work:

npm install -g @angular/cli   # Install Angular CLI globally

ng add @angular/material      # Install Angular Material (optional)

npm install firebase @angular/fire  # Install Firebase for Angular

npm install bcryptjs          # Install bcrypt.js for password hashing

npm install @angular/platform-browser @angular/common @angular/forms @angular/router  # Install necessary Angular dependencies


# Component Overview and Functions:

## Component:LatexRenderer

The LatexRenderer component facilitates inputting, rendering, and managing LaTeX equations. It integrates MathJax for equation rendering and utilizes Firestore for storing and managing equations. Users can save new equations, select them for re-rendering, and delete existing equations.

***Variables and Constructor***:

equation: Stores the current equation inputted by the user.

renderedEquation: Stores the rendered equation as sanitized HTML.

selectedEquation: Stores the currently selected equation for rendering.

equations: Array of equations fetched from Firestore.

firestore: Instance of Firestore for database operations.

router: Instance of Angular Router for navigation.

saveMessage: Message to display the status of save or delete operations.

***Functions***:

ngOnInit: This function is called during component initialization. It loads MathJax for equation rendering and fetches equations stored in Firestore.

loadMathJax: Loads the necessary scripts for MathJax to render LaTeX equations.

renderEquation: Renders the LaTeX equation inputted by the user and sanitizes the rendered HTML.

saveEquation: Saves the current equation to Firestore and updates the list of equations.

deleteEquation: Deletes a specific equation from Firestore and updates the list of equations.

getEquations: Fetches all equations stored in Firestore and returns them as an array.

selectEquation: Allows selecting and rendering a specific equation.

navigateToLogin: Navigates to the login page.

navigateToRegister: Navigates to the registration page.

## Component: Register

The Register component allows users to create an account by verifying required fields, hashing the password for security reasons, and storing the information in Firestore. Upon successful registration, the user is automatically logged in and redirected to the appropriate dashboard based on their account type.

**Variables**:
- id: Stores the chosen username by the user.
- password: Stores the chosen password by the user.
- accountType: Defines the account type (default is 'student').
- registerMessage: Message to display the registration status.
- firestore: Instance of Firestore for database operations.
- router: Instance of Angular Router for navigation.

**Functions**:

**register**: This function manages the registration process:
- It checks that the id and password fields are not empty.
- It hashes the password before storing it in Firestore.
- It saves the user's information (id, hashed password, account type) in Firestore.
- If registration is successful, it displays a success message and automatically redirects the user to the appropriate dashboard.
- If an error occurs, it displays an error message.

**logout**: This function redirects the user to the latex-renderer component.

---

## Component: Login

The Login component allows users to log in by verifying their credentials against those stored in Firestore. It securely compares passwords using bcrypt and redirects users to the appropriate dashboard based on their account type (teacher or student).

**Variables**:
- id: Stores the user's username.
- password: Stores the user's password.
- loginMessage: Message to display the login status.
- firestore: Instance of Firestore for database operations.
- router: Instance of Angular Router for navigation.

**Functions**:

**login**: This function verifies the user's credentials:
- It retrieves all documents from the 'users' collection in Firestore.
- It compares the provided username with the stored usernames.
- If a matching username is found, it compares the hashed password.
- If the comparison is successful, it stores the user's information in localStorage and redirects the user to the appropriate dashboard.
- If the username or password is incorrect, an error message is displayed.

**logout**: This function redirects the user to the latex-renderer component.

