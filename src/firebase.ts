// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAoO0W0buZLkw8Bs9vwH_YxP8TbuicjPfs",
  authDomain: "fundme-4000b.firebaseapp.com",
  projectId: "fundme-4000b",
  storageBucket: "fundme-4000b.firebasestorage.app",
  messagingSenderId: "831162386083",
  appId: "1:831162386083:web:7a1f55e82cea0085cae116",
  measurementId: "G-V470BG5MCN"
};

export const app = initializeApp(firebaseConfig);