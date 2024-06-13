import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    try {
      await addDoc(collection(this.firestore, 'users'), {
        id: this.id,
        password: this.password,
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
