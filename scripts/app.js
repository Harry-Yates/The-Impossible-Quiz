// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore, collection, addDoc, doc, deleteDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDt3IJOc72FRvezLj34ihbjoH58-MzqlzQ",
  authDomain: "the-impossible-quiz-3bb5a.firebaseapp.com",
  projectId: "the-impossible-quiz-3bb5a",
  storageBucket: "the-impossible-quiz-3bb5a.appspot.com",
  messagingSenderId: "1060021164352",
  appId: "1:1060021164352:web:8f8e79690162952ada82a5",
  measurementId: "G-GKYP75KNQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getQuestions() {
  const questions = await getDocs(collection(db, "questions"));
  return questions.docs.map(question => question.data());
}

async function startGame() {
  const quizQuestion = document.querySelector('.quiz__question');
  let currentQuestion = 0;
  let currentScore;
  let questions = await getQuestions();
  quizQuestion.innerText = questions[1].question;
  console.log(questions);
}

startGame();

// To add
// Restart game
// Next question
// Right or wrong
// Keep score
// Have the last question been asked?
// Display score
// Display progress bar