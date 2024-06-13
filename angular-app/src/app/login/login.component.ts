import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
      const q = query(collection(this.firestore, 'users'), where('id', '==', this.id), where('password', '==', this.password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data();
        localStorage.setItem('userId', this.id);
        localStorage.setItem('accountType', user['accountType']);
        this.loginMessage = `Welcome ${user['accountType']}!`;
        // Redirect to the appropriate page based on account type
        if (user['accountType'] === 'teacher') {
          this.router.navigate(['/teacher-dashboard']);
        } else {
          this.router.navigate(['/student-dashboard']);
        }
      } else {
        this.loginMessage = 'Invalid id or password.';
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
