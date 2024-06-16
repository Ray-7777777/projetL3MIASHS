import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  id: string = '';
  password: string = '';
  accountType: string = 'student'; // Default to student
  registerMessage: string = '';
  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router);

  constructor() {}

  async register() {
    // Vérifier que les champs ID et mot de passe ne sont pas vides
    if (!this.id || !this.password) {
      this.registerMessage = 'ID and Password are required.';
      return;
    }

    try {
      // Hacher le mot de passe avant de le stocker
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(this.password, salt);

      await addDoc(collection(this.firestore, 'users'), {
        id: this.id,
        password: hashedPassword,
        accountType: this.accountType
      });
      this.registerMessage = 'Account created successfully!';
      // Automatically log the user in after registration
      this.router.navigate([this.accountType === 'teacher' ? '/teacher-dashboard' : '/student-dashboard']);
    } catch (e) {
      console.error('Error creating account: ', e);
      this.registerMessage = 'Error creating account. Please try again.';
    }
  }
  
  logout() {
    this.router.navigate(['/latex-renderer']);
  }
}
