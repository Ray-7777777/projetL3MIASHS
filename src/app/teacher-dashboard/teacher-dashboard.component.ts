import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Firestore, collection, addDoc, deleteDoc, doc, getDocs, updateDoc, query, where } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var MathJax: any;

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, CommonModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit, OnDestroy, AfterViewChecked {
  equation: string = '';
  renderedEquation: SafeHtml = '';
  selectedEquation: string = '';
  equations: { id: string, equation: string, answer: string, resolvedBy: string }[] = [];
  resolvedEquations: { equation: string, resolvedBy: string }[] = [];
  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router);
  saveMessage: string = '';
  userId: string = localStorage.getItem('userId') || '';
  private mathJaxConfig: any;
  private equationsLoaded: boolean = false;

  constructor(private sanitizer: DomSanitizer) {}

  async ngOnInit(): Promise<void> {
    this.loadMathJax();
    this.equations = await this.getEquations();
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

  renderEquation() {
    try {
      const tempElement = document.createElement('div');
      tempElement.innerHTML = '$$' + this.equation + '$$';
      MathJax.typesetPromise([tempElement]).then(() => {
        this.renderedEquation = this.sanitizer.bypassSecurityTrustHtml(tempElement.innerHTML);
      }).catch((err: any) => console.log(err.message));
    } catch (err) {
      this.renderedEquation = this.sanitizer.bypassSecurityTrustHtml('<span class="error-message">Invalid LaTeX equation</span>');
    }
  }

  async saveEquation() {
    try {
      const docRef = await addDoc(collection(this.firestore, 'question_profs'), {
        equation: this.equation,
        timestamp: new Date(),
        answer: '',
        resolvedBy: '',
        createdBy: this.userId
      });
      console.log('Document written with ID: ', docRef.id);
      this.saveMessage = 'Equation saved successfully!';
      this.equations = await this.getEquations(); // Refresh equations list
      this.equationsLoaded = true;
    } catch (e) {
      console.error('Error adding document: ', e);
      this.saveMessage = 'Error saving equation. Please try again.';
    }
  }

  async deleteEquation(id: string) {
    try {
      await deleteDoc(doc(this.firestore, 'question_profs', id));
      console.log('Document with ID: ', id, ' deleted');
      this.saveMessage = 'Equation deleted successfully!';
      this.equations = await this.getEquations(); // Refresh equations list
      this.equationsLoaded = true;
    } catch (e) {
      console.error('Error deleting document: ', e);
      this.saveMessage = 'Error deleting equation. Please try again.';
    }
  }

  async updateAnswer(id: string, answer: string) {
    try {
      const equationDoc = doc(this.firestore, 'question_profs', id);
      await updateDoc(equationDoc, { answer: answer });
      console.log('Answer updated for Document ID: ', id);
      this.saveMessage = 'Answer updated successfully!';
      this.equations = await this.getEquations(); // Refresh equations list
      this.equationsLoaded = true;
    } catch (e) {
      console.error('Error updating answer: ', e);
      this.saveMessage = 'Error updating answer. Please try again.';
    }
  }

  async getEquations() {
    const querySnapshot = await getDocs(query(collection(this.firestore, 'question_profs'), where('createdBy', '==', this.userId)));
    const equations: { id: string, equation: string, answer: string, resolvedBy: string, createdBy: string }[] = [];
    this.resolvedEquations = []; // Clear the resolvedEquations array to avoid duplicates
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (!data['resolvedBy']) {
        equations.push({ id: doc.id, equation: data['equation'], answer: data['answer'], resolvedBy: data['resolvedBy'], createdBy: data['createdBy'] });
      } else {
        this.resolvedEquations.push({ equation: data['equation'], resolvedBy: data['resolvedBy'] });
      }
    });
    return equations;
  }
}
