import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3xBGsPHvfZTq77ylMN_YMJ15Kpxy8seg",
  authDomain: "puntoencuentro-35780.firebaseapp.com",
  projectId: "puntoencuentro-35780",
  storageBucket: "puntoencuentro-35780.firebasestorage.app",
  messagingSenderId: "892190191295",
  appId: "1:892190191295:web:d29189373acf57eede200a",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
