// Selecting all required elements
const start_btn = document.querySelector(".start-btn button");
const info_box = document.querySelector(".info-container");
const continue_btn = document.getElementById("info-continue"); 
const quitInfo_btn = document.getElementById("info-quit");
const replay_btn = document.getElementById("result-replay");
const quitResult_btn = document.getElementById("result-quit"); 
const quiz_box = document.querySelector(".quiz-box");
const option_list = document.querySelector(".option-list");
const timeCount = quiz_box.querySelector(".timer-sec");
const next_btn = quiz_box.querySelector(".next-btn");
const result_box = document.querySelector(".result-box");
const score_text = result_box.querySelector(".score-text span p");

let timeValue = 15;
let question_count = 0;
let userScore = 0;
let timer;

// Start Quiz button clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); // show the info box
};

// Quit Quiz button clicked on info box
quitInfo_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // hide the info box
};

// Continue Quiz button clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // hide the info box
    quiz_box.classList.add("activeQuiz"); // show the quiz box
    showQuestions(question_count); // load the first question
    startTimer(timeValue); // start the timer
};

// Quit Quiz button clicked on result box
quitResult_btn.onclick = () => {
    window.location.reload(); // Reload the page or redirect to main page
};

// Replay Quiz button clicked on result box
replay_btn.onclick = () => {
    userScore = 0; // Reset score
    question_count = 0; // Reset question count
    result_box.classList.remove("activeResult"); // Hide result box
    quiz_box.classList.add("activeQuiz");//show the quiz box
    showQuestions(question_count); // Call function to start the quiz again
};

// When Next button is clicked
next_btn.onclick = () => {
    if (question_count < questions.length - 1) {
        question_count++; // Increase question count
        showQuestions(question_count); // Show next question
        resetTimer(); // Reset the timer
    } else {
        clearInterval(timer); // Clear the timer
        showResult(); // Show result box
    }
};

// Function to display questions
function showQuestions(index) {
    const que_text = document.querySelector(".que-text");
    const total_que = document.querySelector(".total-que span");

    let question_tag = `<span>${questions[index].question}</span>`;
    let option_tag = questions[index].options.map(option =>
        `<div class="option"><span>${option}</span></div>`
    ).join('');

    que_text.innerHTML = question_tag;
    option_list.innerHTML = option_tag;

    const options = option_list.querySelectorAll(".option");
    options.forEach(option => {
        option.addEventListener("click", () => optionSelected(option), { once: true });
    });

    // Update question number in the footer
    total_que.innerHTML = `<p>${index + 1}</p>Of<p>${questions.length}</p>`;

    next_btn.classList.remove("show"); // Hide Next button until an option is selected
    resetTimer(); // Start timer for the current question
}

function disableOptions(){
    // Disable all options after a selection
    const options = option_list.querySelectorAll(".option");
    options.forEach(option => {
        option.classList.add("disabled"); // Add a class to visually indicate it's disabled
        option.style.pointerEvents = "none"; // Disable further clicking
    });

}


// When an option is selected
function optionSelected(answer) {
    clearInterval(timer); // Stop the timer
    let userAns = answer.textContent;
    let correctAns = questions[question_count].answer;

    // If correct answer
    if (userAns === correctAns) {
        userScore++;
        answer.classList.add("correct"); // Highlight correct answer
    } else {
        answer.classList.add("incorrect"); // Highlight incorrect answer
        // Auto-highlight correct answer
        for (let option of option_list.children) {
            if (option.textContent === correctAns) {
                option.classList.add("correct");
            }
        }
    }

    disableOptions();
    
    next_btn.classList.add("show"); // Show the Next button
}



// Timer function
function startTimer() {
    clearInterval(timer); // Clear any existing timer to avoid multiple intervals
    timer = setInterval(() => {
        timeValue--; // Decrement the time by 1 second
        document.querySelector(".timer-sec").textContent = timeValue; // Update the time display

        // Add warning class if time is 5 seconds or less
        if (timeValue <= 5) {
            document.querySelector(".timer-sec").classList.add("warning");
        } else {
            document.querySelector(".timer-sec").classList.remove("warning");
        }
        

        if (timeValue <= 0) {
            clearInterval(timer); // Stop the timer at zero
            disableOptions(); // Disable options if time runs out
            next_btn.classList.add("show"); // Show the Next button when time is up
        }
    }, 1000); // Run every 1 second (1000ms)
}

// Reset the timer value for each new question
function resetTimer() {
    timeValue = 15; // Reset the timer back to 15 seconds
    document.querySelector(".timer-sec").textContent = timeValue; // Update the display immediately
    startTimer(); // Start the timer again
}


// Show result box
function showResult() {
    quiz_box.classList.remove("activeQuiz"); // Hide quiz box
    result_box.classList.add("activeResult"); // Show result box
    score_text.innerHTML = userScore;
}

// Questions array
let questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Text Multiple Language", "Hyper Tool Multi Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "What does CSS stand for?",
        options: ["Common Style Sheet", "Colorful Style Sheet", "Computer Style Sheet", "Cascading Style Sheet"],
        answer: "Cascading Style Sheet"
    },
    {
        question: "What does PHP stand for?",
        options: ["Hypertext Preprocessor", "Hypertext Programming", "Hypertext Preprogramming", "Hometext Preprocessor"],
        answer: "Hypertext Preprocessor"
    },
    {
        question: "What does SQL stand for?",
        options: ["Stylish Question Language", "Stylesheet Query Language", "Statement Question Language", "Structured Query Language"],
        answer: "Structured Query Language"
    },
    {
        question: "What does XML stand for?",
        options: ["eXtensible Markup Language", "eXecutable Multiple Language", "eXtra Multi-Program Language", "eXamine Multiple Language"],
        answer: "eXtensible Markup Language"
    }
];
