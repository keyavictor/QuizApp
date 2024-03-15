# Quiz Application Technical Documentation

## Introduction

The Quiz Application is a web-based platform that allows users to take a timed multiple-choice quiz. It features functionalities such as timed quizzes, multiple-choice questions, automatic submission, attempt tracking, and grading. This document provides a comprehensive overview of the technical aspects of the application, including the frontend, backend, data flow, and key functionalities.

## Architecture Overview

The Quiz Application follows a client-server architecture, where the frontend interacts with the backend server to handle quiz submissions and data storage. The frontend is built using HTML, CSS, and JavaScript, while the backend server is implemented using Node.js with the Express framework.

## Frontend Components

### 1. HTML (index.html)

The HTML file defines the structure of the quiz interface. It includes elements for displaying questions, options, the timer, the user's name input field, the attempt count display, and the submit button.

### 2. CSS (style.css)

The CSS file provides styles and layout for the HTML elements, enhancing the user interface and visual appeal of the quiz application.

### 3. JavaScript (quiz.js)

The JavaScript file implements the logic and behavior of the quiz application. It handles question generation, timer functionality, submission handling, attempt tracking, and interaction with the backend server.

## Backend Components

### 1. Node.js with Express

The backend server is implemented using Node.js with the Express framework. Express provides a lightweight and flexible web application framework for building robust server-side applications.

### 2. POST Endpoint ('/submit')

The backend server exposes a POST endpoint at '/submit' to handle quiz submissions. When a POST request is made to this endpoint with submission data (including the user's name, answers, score, grade, and attempts), the server stores this data and returns feedback to the client.

## Data Flow

1. **Question Generation**: JavaScript dynamically generates quiz questions based on data provided in the `quizData` array. These questions are displayed on the frontend.
2. **User Interaction**: Users input their name and select answers to the multiple-choice questions presented on the quiz interface.
3. **Submission Handling**: Upon clicking the submit button, the frontend collects the user's answers and sends them to the backend server using the Fetch API with the 'POST' method and JSON format.
4. **Backend Processing**: The backend server receives the submission data, processes it, stores it, and returns feedback to the frontend.
5. **Feedback Display**: The frontend displays the user's score, grade, and any additional feedback received from the backend.

## Key Functionalities

### 1. Timer
- The quiz features a timer set to 5 minutes.
- The timer starts counting down as soon as the quiz page loads.
- If the timer runs out before the user submits the quiz, it triggers automatic submission.

### 2. Attempt Tracking
- The application tracks the number of attempts made by the user during the 5-minute time frame.
- The attempt count is displayed on the frontend and sent to the backend along with the submission data.

### 3. Automatic Submission
- If the timer runs out before the user manually submits the quiz, the application automatically submits the quiz and reloads the page.

### 4. Grading
- After submitting the quiz, the user's score and grade are calculated based on the percentage of correct answers.
- Grades are assigned as follows:
  - A: 80% or higher
  - B: 60% - 79%
  - C: 40% - 59%
  - D: Less than 40%

## Development Considerations

- **Frontend**: The frontend is implemented using HTML, CSS, and JavaScript, focusing on providing an intuitive and responsive user interface.
- **Backend**: The backend server is built with Node.js and Express, emphasizing robustness, scalability, and efficient data handling.
- **Data Flow**: A clear data flow ensures smooth interaction between the frontend and backend components, facilitating seamless quiz taking and submission.
- **Error Handling**: The application includes error handling mechanisms to gracefully handle unexpected scenarios and provide informative feedback to users.

## Conclusion

The Quiz Application provides a user-friendly and feature-rich platform for taking timed multiple-choice quizzes. By leveraging modern web technologies and best practices, it delivers a seamless and engaging user experience while ensuring reliable data handling and processing.

### Installation
To install dependencies, run the following command:
```bash
npm install 
```
### running the project
```bash
npm run dev 
```