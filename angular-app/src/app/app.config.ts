import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD-CHLqM7MJrieLBQThabF4SCDOL1zjWck",
  authDomain: "projet-angular-ed66e.firebaseapp.com",
  databaseURL: "https://projet-angular-ed66e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "projet-angular-ed66e",
  storageBucket: "projet-angular-ed66e.appspot.com",
  messagingSenderId: "547163619986",
  appId: "1:547163619986:web:24fd02134ea79af8d99c4b"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};
