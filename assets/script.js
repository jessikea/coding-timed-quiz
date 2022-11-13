var headerEl = document.querySelector(".header"); 
var startBtnEl = document.querySelector("#startButton"); 


var title = document.querySelector("#title"); 
var mainP = document.querySelector("#main-p"); 
var timerEl = document.querySelector("#timer"); 
var quiz = document.querySelector(".quiz");
var highscoreBtnEl = document.querySelector(".view-high-score");
var quizIndex = 0; 


var correctAns = document.createElement("div");
correctAns.className = "user-answer";
correctAns.textContent = "Correct!";

var incorrectAns = document.createElement("div");
incorrectAns.className = "user-answer";
incorrectAns.textContent = "Incorrect! 10 seconds removed from time!";



var timeLeft = 0; 
timerEl.textContent = "Time: " + timeLeft;
var startGame = function () {
  timeLeft = 75; 
  title.remove(); 
  mainP.remove(); 
  startBtnEl.remove(); 

  timeInt = setInterval(function () {
   
    if (timeLeft > 0) {
      timerEl.textContent = "Time: " + timeLeft; 
      timeLeft--; 
    } else {
      timerEl.textContent = ""; 
      clearInterval(timeInt); 
      Done();
    }
  }, 1000);

  createQuestion();
};

var createQuestion = function () {
  //prompts question//
  questionHead.textContent = QNA[quizIndex].question;
  quiz.appendChild(questionHead); 
  questionDiv.textContent = "";

  //appends choices of answers//
  quiz.appendChild(questionDiv); 
  questionBtnOne.textContent = QNA[quizIndex].choices[0];
  questionDiv.appendChild(questionBtnOne); 
  questionBtnTwo.textContent = QNA[quizIndex].choices[1];
  questionDiv.appendChild(questionBtnTwo); 
  questionBtnThree.textContent = QNA[quizIndex].choices[2];
  questionDiv.appendChild(questionBtnThree); 
  questionBtnFour.textContent = QNA[quizIndex].choices[3];
  questionDiv.appendChild(questionBtnFour); 
  

  //makes the choices into clickable buttons//
  var questionOneBtnEl = document.querySelector(".question-btn-one");
  questionOneBtnEl.addEventListener("click", newQuestion);
  var questionTwoBtnEl = document.querySelector(".question-btn-two");
  questionTwoBtnEl.addEventListener("click", newQuestion);
  var questionThreeBtnEl = document.querySelector(".question-btn-three");
  questionThreeBtnEl.addEventListener("click", newQuestion);
  var questionFourBtnEl = document.querySelector(".question-btn-four");
  questionFourBtnEl.addEventListener("click", newQuestion);
};


var QNA = [
  {
      question: "Question 1 : String values must be enclosed within _____ when being assigned to variables.",
      choices: ["a. commas", "b. curly brackets", "c. quotes", "d. parenthesis"],
      answer: "c. quotes",
      solution: "question-btn-three",
  },
  {
      question: "Question 2 : Commonly used data types DO NOT include:",
      choices: ["a. strings", "b. booleans", "c. alerts", "d. numbers"],
      answer: "c. alerts",
      solution: "question-btn-three",

  },
  {
      question: "Question 3 : How do you create a function in JavaScript",
      choices: ["a. function = myFunction()", "b. function myFunction()", "c. function:myFunction()", "d. createMyFunction()"],
      answer: "b. function myFunction()",
      solution: "question-btn-two",

  },

  {
      question: "Question 5 : To see if two variables are equal in an if / else statement you would use ____.",
      choices: ["a. =", "b. ==", "c. 'equals'", "d. !="],
      answer: "b. ==",
      solution: "question-btn-two",

  },
  {
      question: "Question 6 : The first index of an array is ____.",
      choices: ["a. 0", "b. 1", "c. 8", "d. any"],
      answer: "a. 0",
      solution: "question-btn-one",

  },
];


//makes each choice a button to click
var questionBtnOne = document.createElement("button"); 
questionBtnOne.className = "question-btn-one";
questionBtnOne.id = "question-btns";
var questionBtnTwo = document.createElement("button");
questionBtnTwo.className = "question-btn-two";
questionBtnTwo.id = "question-btns";
var questionBtnThree = document.createElement("button"); 
questionBtnThree.className = "question-btn-three";
questionBtnThree.id = "question-btns";
var questionBtnFour = document.createElement("button"); 
questionBtnFour.className = "question-btn-four";
questionBtnFour.id = "question-btns";


//next question function where answer message is removed after clicking a choice button//
// refreshes answer message.
var newQuestion = function (event) {
  correctAns.remove();
  incorrectAns.remove();
  var btnPressed = event.target; 
  if (
    btnPressed.className === QNA[quizIndex].solution &&
    quizIndex < QNA.length - 1
  ) {
    
    quizIndex++;
    createQuestion();
    quiz.appendChild(correctAns);
  } else if (
    btnPressed.className != QNA[quizIndex].solution &&
    quizIndex < QNA.length - 1
  ) {
    timeLeft -= 10;
    quizIndex++;
    createQuestion();
    quiz.appendChild(incorrectAns);
  } else if (btnPressed.className === QNA[quizIndex].solution) {
  
    Done();
    quiz.appendChild(correctAns);
    return;
  } else {
    timeLeft -= 10;
    Done();
    quiz.appendChild(incorrectAns);
    return;
  }
};


// vars for changing to highscore page
var questionHead = document.createElement("h1"); 
questionHead.className = "question-head";
var questionDiv = document.createElement("ol");
questionDiv.className = "QNA";

// score form asks for user input of initials to put on highscore page.
var scoreForm = document.createElement("form");
var initials = document.createElement("input");
initials.className = "initials-score";
initials.type = "text";
initials.placeholder = "Enter initials";
scoreForm.appendChild(initials);


var scoreBtn = document.createElement("button");
scoreBtn.className = "submit-btn";
scoreBtn.type = "submit";
scoreBtn.textContent = "Submit Highscore";
scoreForm.appendChild(scoreBtn);
var goBackBtn = document.createElement("button"); 
goBackBtn.className = "go-back";
goBackBtn.textContent = "Go Back";
var clearScoreBtn = document.createElement("button"); 
clearScoreBtn.className = "clear-score";
clearScoreBtn.textContent = "Clear Highscores";


// clears time interval and sets timeLeft equal to a score and Time Left interval is cleared.
function Done() {
  
  if (timeLeft >= 0) {
        var finalScores = timeLeft;
        clearInterval(timeLeft);
  } else {
    timeLeft = 0;
    finalScores = timeLeft
    timerEl.textContent = "Time: " + finalScores;
  }
  questionHead.textContent = "All Done!";
  questionDiv.textContent = "Your final score is " + finalScores;
  questionDiv.appendChild(scoreForm);
  document.addEventListener("submit", function (event) {
    event.preventDefault();
    localStorage.setItem(initials.value, finalScores);
    highScore();
  });
}


var highScore = function () {
  try {
    clearInterval(timeInt);
  } catch {}
  headerEl.remove(); 
  title.remove(); 
  mainP.remove(); 
  startBtnEl.remove(); 
  correctAns.remove();
  incorrectAns.remove();

  quiz.appendChild(questionHead);
  quiz.appendChild(questionDiv);

  questionHead.textContent = "High Scores";
  questionDiv.textContent = "";
  var highScoreList = [];
  for (let i = 0; i < localStorage.length; i++) {
    
    highScoreList.push(
      localStorage.getItem(localStorage.key(i)) + " - " + localStorage.key(i)
    ); 
    highScoreList.sort().reverse(); 
  }
  for (let i = 0; i < highScoreList.length; i++) {
   
    var highScoreListItem = document.createElement("li"); 
    highScoreListItem.className = "score-list";
    highScoreListItem.textContent = highScoreList[i]; 
    questionDiv.append(highScoreListItem); 
  }

  quiz.appendChild(goBackBtn);
  quiz.appendChild(clearScoreBtn);

  goBackBtn.addEventListener("click", goBack);
  clearScoreBtn.addEventListener("click", clearScore);
};

var goBack = function () {
  window.location.reload();
};

var clearScore = function () {
  localStorage.clear();
  alert("High Scores cleared");
  window.location.reload();
};

startBtnEl.addEventListener("click", startGame); 
highscoreBtnEl.addEventListener("click", highScore);