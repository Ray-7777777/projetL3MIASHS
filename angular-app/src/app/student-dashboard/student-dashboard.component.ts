import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Firestore, collection, getDocs, updateDoc, doc } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var MathJax: any;

interface Equation {
  id: string;
  equation: string;
  answer: string;
  userAnswer: string;
  attempts: number;
  createdBy: string;
  resolvedBy?: string;
}

interface ResolvedEquation {
  equation: string;
  createdBy: string;
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit, AfterViewChecked, OnDestroy {
  equations: Equation[] = [];
  resolvedEquations: ResolvedEquation[] = [];
  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router);
  userId: string = localStorage.getItem('userId') || '';
  private equationsLoaded: boolean = false;

  async ngOnInit(): Promise<void> {
    this.loadMathJax();
    this.equations = await this.getEquations();
    this.resolvedEquations = await this.getResolvedEquations();
    this.equationsLoaded = true;
  }

  ngAfterViewChecked() {
    if (this.equationsLoaded) {
      MathJax.typesetPromise();
      this.equationsLoaded = false;
    }
  }

  ngOnDestroy(): void {
    this.unloadMathJax();
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('accountType');
    this.router.navigate(['/latex-renderer']);
    alert('Successfully logged out.');
  }

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

  unloadMathJax() {
    const scripts = document.querySelectorAll('script[src*="mathjax"]');
    scripts.forEach(script => script.remove());
  }

  async getEquations() {
    const querySnapshot = await getDocs(collection(this.firestore, 'question_profs'));
    const equations: Equation[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (!data['resolvedBy'] && data['answer']) {
        equations.push({ 
          id: doc.id, 
          equation: data['equation'], 
          answer: data['answer'], 
          userAnswer: '', 
          attempts: 0,
          createdBy: data['createdBy'] 
        });
      }
    });
    return equations;
  }

  async getResolvedEquations() {
    const querySnapshot = await getDocs(collection(this.firestore, 'question_profs'));
    const resolvedEquations: ResolvedEquation[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data['resolvedBy'] === this.userId) {
        resolvedEquations.push({ 
          equation: data['equation'], 
          createdBy: data['createdBy'] 
        });
      }
    });
    return resolvedEquations;
  }

  async checkAnswer(equation: Equation) {
    if (equation.userAnswer === equation.answer) {
      const equationDoc = doc(this.firestore, 'question_profs', equation.id);
      await updateDoc(equationDoc, { resolvedBy: this.userId });
      this.equations = await this.getEquations();
      this.resolvedEquations = await this.getResolvedEquations();
      this.equationsLoaded = true;
    } else {
      equation.attempts++;
      if (equation.attempts >= 3) {
        alert('Incorrect answer. You have reached the maximum number of attempts.');
      } else {
        alert('Incorrect answer. Try again.');
      }
    }
  }
}
