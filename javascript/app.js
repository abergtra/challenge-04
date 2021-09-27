
//Connect to HTML Buttons
var startButton = document.getElementById('startquiz');
var viewscoreButton = document.getElementById('head');
var replayButton = document.getElementById("replay");
var clearscoreButton = document.getElementById("clearscores");
var submitScore = document.getElementById("submithighscore");

//Connect to HTML timer
var timer = document.getElementById('timer'); 

//Connect to HTML Pages
var startPage = document.getElementsByClassName('startpage');
var questPage = document.getElementsByClassName('questionpage');
var initPage = document.getElementsByClassName('initialspage');
var hscorePage = document.getElementsByClassName('highscorepage');


//Connect to HTML Questions and Answer buttons
var questionNumber = document.getElementById('qnum');
var questionText = document.getElementById('questiontext');
var answerA = document.getElementById('answerA');
var answerB = document.getElementById('answerB');
var answerC = document.getElementById('answerC');
var answerD = document.getElementById('answerD');

//Connect to HTML locations with info to fill
var finalScore = document.getElementById("finalscore");
var maxScore = document.getElementById("maxscore");
var userInitials = document.getElementById("initials");
var scoreContainer = document.getElementById("HS-score");
var initialsContainer = document.getElementById("HS-initials");

//Questions
var myQuestions = [
    {
      question: "Which of the following is the correct syntax to create a cookie using JavaScript?",
      answersA: "document.cookie = 'key1 = value1; key2 = value2; expires = date';", 
      answersB: "browser.cookie = 'key1 = value1; key2 = value2; expires = date';", 
      answersC: "window.cookie = 'key1 = value1; key2 = value2; expires = date';", 
      answersD: "navigator.cookie = 'key1 = value1; key2 = value2; expires = date';",
      correctAnswer: 'A'
    },
    {
        question: "Which built-in method combines the text of two strings and returns a new string?",
        answersA: "append()", 
        answersB: "concat()", 
        answersC: "attach()", 
        answersD: "None of the above.",
        correctAnswer: 'B'
    },
    {
        question: "Which built-in method returns the characters in a string beginning at the specified location?",
        answersA: "substr()", 
        answersB: "getSubstring()", 
        answersC: "slice()", 
        answersD: "None of the above.",
        correctAnswer: 'A'
    },
    {
        question: "Which of the following function of Number object defines how many total digits to display of a number?",
        answersA: "toExponential()", 
        answersB: "toFixed()", 
        answersC: "toLocaleString()", 
        answersD: "toPrecision()",
        correctAnswer: 'D'
    },
  ];

//Constants
questionNumber = 1;
var finalQuestion = myQuestions.length;
var startingScore = 0;
var timePenalty = 10;


//Functions to control Page Visibility
function hideStartPg(){
    for (var i = 0; i < startPage.length; i++){
    startPage[i].style.display = "none";
    };
};
function findStartPg(){
    for (var i = 0; i < startPage.length; i++){
    startPage[i].style.display = "block";
    };
};
function hideQuestPg(){
    for (var i = 0; i < questPage.length; i++){
    questPage[i].style.display = "none";
    };
};
function findQuestPg(){
    for (var i = 0; i < questPage.length; i++){
    questPage[i].style.display = "block";
    };
};
function hideInitPg(){
    for (var i = 0; i < initPage.length; i++){
    initPage[i].style.display = "none";
    };
};
function findInitPg(){
    for (var i = 0; i < initPage.length; i++){
    initPage[i].style.display = "block";
    };
};
function hideScorePg(){
    for (var i = 0; i < hscorePage.length; i++){
    hscorePage[i].style.display = "none";
    };
};
function findScorePg(){
    for (var i = 0; i < hscorePage.length; i++){
    hscorePage[i].style.display = "block";
    };
};

//Countdown Timer Function
function tickingTime(timer){
    var seconds = 5;
    var countdown = setInterval(function(){
        if (seconds>0){
            seconds--;
            timer.innerHTML= seconds;
        } else{
            //alert("You ran out of time!")
            clearInterval(countdown);
            //input action when timer runs out
        }
    }, 1000);
};

//Generate Question Function
function generateQuestion(){
    
    if (questionNumber === finalQuestion){
        openInitPG();
        //timer=0
    } else {
        currentQuestion = myQuestions[questionNumber - 1];
        questionText.innerHTML = currentQuestion.question;
        answerA.innerHTML = currentQuestion.answersA;
        answerB.innerHTML = currentQuestion.answersB;
        answerC.innerHTML = currentQuestion.answersC;
        answerD.innerHTML = currentQuestion.answersD;
        questionNumber++;
    }
};

// function for start quiz button being pressed
startButton.onclick = function(){
    openQuestPG();
    //tickingTime(timer);
    //generateQuestion();
};

// function for last question being answered
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Correct!");
        currentQuestionIndex++;
        generateQuestion();
        //display in the results div that the answer is correct.
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        // If incorrect, subtract 10sec from timer
        count = count - penalty;
        alert("Incorrect!")
        currentQuestionIndex++;
        generateQuestion();
        //display in the results div that the answer is wrong.
    } else{
        showScore();
    };
};

//initals page submit button
submitScore.onclick = function(){
    openScorePG();
};

//initals page submit button
replayButton.onclick = function(){
    openStartPG();
};

//page opening functions
function openQuestPG(){
    hideStartPg();
    findQuestPg();
    hideInitPg();
    hideScorePg();
    generateQuestion();
};
function openInitPG(){
    hideStartPg();
    hideQuestPg();
    findInitPg();
    hideScorePg();
};
function openScorePG(){
    hideStartPg();
    hideQuestPg();
    hideInitPg();
    findScorePg();
};
function openStartPG(){
    findStartPg();
    hideQuestPg();
    hideInitPg();
    hideScorePg();
};



//upon refresh set start page and hide others
openStartPG();

//navigate to high scores (eliminate any stored info)
viewscoreButton.addEventListener("click",function(){
    openScorePG();
}, 300);