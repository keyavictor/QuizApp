// quiz.js

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const timerDisplay = document.getElementById('timer');
const userNameInput = document.getElementById('userName');

// Define quiz data
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        answer: "Jupiter"
    },
    {
        question: "Which mammal can fly?",
        options: ["Bat", "Elephant", "Whale", "Kangaroo"],
        answer: "Bat"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "O2", "N2"],
        answer: "H2O"
    },
    {
        question: "What is the tallest mammal?",
        options: ["Elephant", "Giraffe", "Horse", "Lion"],
        answer: "Giraffe"
    },
    {
        question: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Shanghai"],
        answer: "Tokyo"
    },
    {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Cell membrane", "Mitochondria", "Chloroplast"],
        answer: "Mitochondria"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Cu"],
        answer: "Au"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        answer: "Mars"
    }
];

let timeLeft = 5 * 60; // 5 minutes in seconds
let timerInterval;
let attempts = 0; // Track the number of attempts
let submitButtonClicked = false; // Track if submit button is clicked

// Function to generate quiz questions
function generateQuiz() {
    let quizHTML = "";
    quizData.forEach((questionObj, index) => {
        quizHTML += `<div class="question">${index + 1}. ${questionObj.question}</div>`;
        questionObj.options.forEach(option => {
            quizHTML += `<input type="radio" name="question${index}" value="${option}">
                         <label>${option}</label><br>`;
        });
    });
    quizContainer.innerHTML = quizHTML;
    timerDisplay.textContent = formatTime(timeLeft); // Initialize timer display
}

// Define a flag to track if the quiz has been manually submitted
let manualSubmission = false;

// Function to handle quiz submission
function submitQuiz() {
    const name = userNameInput.value; // Get user's name from input field
    const answers = [];
    let score = 0;

    quizData.forEach((questionObj, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        const userAnswer = selectedOption ? selectedOption.value : null;
        answers.push(userAnswer);

        if (userAnswer === questionObj.answer) {
            score++;
        }
    });

    // Calculate grade
    const totalQuestions = quizData.length;
    const percentage = (score / totalQuestions) * 100;
    let grade;
    if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 60) {
        grade = "B";
    } else if (percentage >= 40) {
        grade = "C";
    } else {
        grade = "D";
    }

    // Send data to the backend
    fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, answers, score, grade, attempts })
    })
    .then(response => response.json())
    .then(data => {
        alert(`Your score is ${data.score}/${totalQuestions}. Grade: ${data.grade}`);
        // If the quiz has been manually submitted or the time has expired, reload the page
        if (manualSubmission || timeLeft <= 0) {
            clearInterval(timerInterval); // Stop the timer
            timeLeft = 5 * 60; // Reset timer
            location.reload(); // Reload the page
        }
    })
    .catch(error => console.error('Error:', error));

    // Increment attempts
    attempts++; // Increment attempts
    // Update attempt count in HTML
    document.getElementById('attemptCount').textContent = attempts;
}

// Timer function
function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft); // Update timer display

        // If the time runs out, submit the quiz
        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Stop the timer
            submitQuiz();
        }
    }, 1000);
}

// Format time as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Event listener for submit button
submitButton.addEventListener('click', function() {
    submitButtonClicked = true;
    submitQuiz();
});

// Generate quiz and start timer on page load
generateQuiz();
startTimer();
