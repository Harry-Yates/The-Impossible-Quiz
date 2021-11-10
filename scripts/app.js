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
  measurementId: "G-GKYP75KNQC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getQuestions() {
  // Grab questions from firebase and return as an array
  const questions = await getDocs(collection(db, "questions"));
  return questions.docs.map((question) => question.data());
}

const startBtn = document.getElementById("start-btn");
const quiz = document.querySelector(".quiz");
const quizQuestion = document.querySelector(".quiz__question");
const quizChoices = document.querySelector(".quiz__choices");
const countdown = document.querySelector(".countdown");

let currentQuestionIndex = 0;
let currentScore = 0;
let questions;
let interval;

async function startGame() {
  quiz.classList.remove("hide");
  startBtn.classList.add("hide");
  questions = await getQuestions();

  // shuffleArray(questions);
  shuffleArray(questions);

  // Output first question from array
  nextQuestion();
}

async function restartGame() {
  // Remove modal
  const modal = document.querySelector(".modal");
  modal.remove();

  // Reload questions
  questions = await getQuestions();

  //Shuffle questions
  // shuffleArray(questions);

  // Reset question index and score
  currentQuestionIndex = 0;
  currentScore = 0;

  // Output first question from array
  nextQuestion();
}

function createModal() {
  // Create modal
  let modal = document.createElement("div");
  modal.classList.add("modal");

  // Create button and add event listener
  let restartBtn = document.createElement("button");
  restartBtn.classList.add("btn");
  restartBtn.classList.add("restart-btn");
  restartBtn.innerText = "Restart game";
  restartBtn.addEventListener("click", restartGame);

  // Create your score text
  let scoreText = document.createElement("p");
  scoreText.innerText = setScoreText(scoreText);

  modal.appendChild(scoreText);
  modal.appendChild(restartBtn);

  return modal;
}

function setScoreText(textContainer) {
  // Set different text depending on score
  return `Your score was 
  ${currentScore}
  😈`;
}

function showModal() {
  let modal = createModal();
  document.querySelector("main").appendChild(modal);
}

function outputQuestion(question) {
  quizChoices.innerHTML = "";
  let q = question.question;
  let answers = question.answers;

  quizQuestion.innerText = q;
  answers.forEach((answer) => {
    const answerButton = document.createElement("button");
    answerButton.textContent = answer.text;
    answerButton.classList.add("btn");
    answerButton.classList.add("quiz__choice");

    answerButton.addEventListener("click", () => {
      // Update score if answer was correct;
      checkIfCorrectAnswer(answer);
      // Increase index of current question
      currentQuestionIndex++;

      // Stop timer
      clearInterval(interval);

      // Disable click on buttons in wait for next question
      const answerButtons = document.querySelectorAll(".quiz__choice");
      answerButtons.forEach((button) => {
        disableButton(button);
      });

      // Set next question
      setTimeout(() => {
        nextQuestion();
      }, 2000);
    });
    quizChoices.appendChild(answerButton);
  });
}

function disableButton(button) {
  button.disabled = true;
}

function nextQuestion() {
  // Clear timer interval from running
  // clearInterval(interval);

  // If we have any questions left
  if (currentQuestionIndex < questions.length) {
    // Display question progress
    updateProgress();
    // Start timer running for ten seconds
    timer(500);

    // Output current question
    outputQuestion(questions[currentQuestionIndex]);
  } else {
    // Open modal when game ended
    showModal();
    console.log(`end of quiz, you got ${currentScore} correct answers`);
  }
}

function checkIfCorrectAnswer(answer) {
  console.log(answer);
  if (answer.correct === true) {
    currentScore++;
    console.log("right answer");
  } else {
    console.log("wrong answer");
  }
}

function timer(seconds) {
  clearInterval(interval);
  let secondsToZero = seconds;

  if (secondsToZero > 0) {
    // Output time in DOM
    countdown.innerText = secondsToZero;
    console.log(secondsToZero);
    secondsToZero--;
  }

  interval = setInterval(() => {
    if (secondsToZero > 0) {
      // Output time in DOM
      countdown.innerText = secondsToZero;
      console.log(secondsToZero);
      secondsToZero--;
    } else {
      clearInterval(interval);
      console.log(secondsToZero);
      console.log("time out");
      countdown.innerText = secondsToZero;
      currentQuestionIndex++;

      const answerButtons = document.querySelectorAll(".quiz__choice");
      answerButtons.forEach((button) => {
        disableButton(button);
      });

      // Set next question
      setTimeout(() => {
        nextQuestion();
      }, 2000);
    }
  }, 1000);
}

function updateProgress() {
  const progressInner = document.querySelector(".progress__inner");
  const quizTracker = document.querySelector(".quiz__tracker");

  let currentQuestion = currentQuestionIndex + 1;
  let progressToPercent = (100 / questions.length) * currentQuestion + "%";

  progressInner.style.width = progressToPercent;

  quizTracker.innerText = `${currentQuestion}/${questions.length}`;
}

function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there are still questions to shuffle
  while (currentIndex != 0) {
    // Pick a remaining question
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return shuffleArray;
}

startBtn.addEventListener("click", startGame);

// TODO
// At end of game
// - Modal popup shown at the end, with score and restart quiz button
// PSEUDO

// START OF GAME
// - user presses start
// - get questions from db and store in array
// - get and output first question from array
// - start timer
// - case 1
// - user presses answer
// - check if wrong or correct
// - add score if correct
// - check if last question
// - true = show end modal with score and reset button
// - false = nextQuestion()

// - case 2
// - timer reaches 0
// - check if last question
// - true = show end modal with score and reset button
// - false = nextQuestion()

// Next question
// Keep score
// Have the last question been asked?
// Timer function
// Restart game

// Javascript
// Right or wrong - confetti library for right, sideways shake for wrong
// Modal
// Shuffle array
// Display progress bar

// SCSS

// Test update for git
