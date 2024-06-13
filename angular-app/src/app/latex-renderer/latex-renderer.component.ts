import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Firestore, collection, addDoc, deleteDoc, doc, getDocs } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var MathJax: any;

@Component({
  selector: 'app-latex-renderer',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, CommonModule],
  templateUrl: './latex-renderer.component.html',
  styleUrls: ['./latex-renderer.component.css']
})
export class LatexRendererComponent implements OnInit {
  equation: string = '';
  renderedEquation: SafeHtml = '';
  selectedEquation: string = '';
  equations: { id: string, equation: string }[] = [];
  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router);
  saveMessage: string = '';

  constructor(private sanitizer: DomSanitizer) {}

  async ngOnInit(): Promise<void> {
    this.loadMathJax();
    this.equations = await this.getEquations();
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

  async getEquations() {
    const querySnapshot = await getDocs(collection(this.firestore, 'equations'));
    const equations: { id: string, equation: string }[] = [];
    querySnapshot.forEach((doc) => {
      equations.push({ id: doc.id, equation: doc.data()['equation'] });
    });
    return equations;
  }

  selectEquation(equation?: string) {
    if (equation) {
      this.equation = equation;
    } else {
      this.equation = this.selectedEquation;
    }
    this.renderEquation();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
