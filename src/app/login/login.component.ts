import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  id: string = '';
  password: string = '';
  loginMessage: string = '';
  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router);

  constructor() {}

  async login() {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'users'));
      let userFound = false;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data['id'] === this.id) {
          userFound = true;
          // Comparer le mot de passe haché
          if (bcrypt.compareSync(this.password, data['password'])) {
            localStorage.setItem('userId', this.id);
            localStorage.setItem('accountType', data['accountType']);
            this.router.navigate([data['accountType'] === 'teacher' ? '/teacher-dashboard' : '/student-dashboard']);
          } else {
            this.loginMessage = 'Invalid password. Please try again.';
          }
        }
      });

      if (!userFound) {
        this.loginMessage = 'User not found. Please try again.';
      }
    } catch (e) {
      console.error('Error logging in: ', e);
      this.loginMessage = 'Error logging in. Please try again.';
    }
  }
  logout() {
    this.router.navigate(['/latex-renderer']);
  }
}
