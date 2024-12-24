import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-_ySCrpTw_NOZXPnzV1XVt9hFw-C8oek",
  authDomain: "cardgame-af26a.firebaseapp.com",
  projectId: "cardgame-af26a",
  storageBucket: "cardgame-af26a.firebasestorage.app",
  messagingSenderId: "1012759529989",
  appId: "1:1012759529989:web:6f64990406019bd79daa6c",
  measurementId: "G-CZF68LJ2RW",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
