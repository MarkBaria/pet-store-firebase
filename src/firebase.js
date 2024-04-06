import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDjWagdodutheG_pEedIRM0QJ30M6lrs2M",
  authDomain: "petstore-d1d98.firebaseapp.com",
  projectId: "petstore-d1d98",
  storageBucket: "petstore-d1d98.appspot.com",
  messagingSenderId: "635315377618",
  appId: "1:635315377618:web:6b9039b343691585c5640b",
  measurementId: "G-FMK6NVTW1G",
  databaseURL:"https://petstore-d1d98-default-rtdb.firebaseio.com"
};


export const app = initializeApp(firebaseConfig);
