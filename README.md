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
