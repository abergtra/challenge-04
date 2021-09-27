
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
var buttonA = document.getElementById('answerA');
var buttonB = document.getElementById('answerB');
var buttonC = document.getElementById('answerC');
var buttonD = document.getElementById('answerD');

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
      choiceA: "document.cookie = 'key1 = value1; key2 = value2; expires = date';", 
      choiceB: "browser.cookie = 'key1 = value1; key2 = value2; expires = date';", 
      choiceC: "window.cookie = 'key1 = value1; key2 = value2; expires = date';", 
      choiceD: "navigator.cookie = 'key1 = value1; key2 = value2; expires = date';",
      correctAnswer: 'answerA'
    },
    {
        question: "Which built-in method combines the text of two strings and returns a new string?",
        choiceA: "append()", 
        choiceB: "concat()", 
        choiceC: "attach()", 
        choiceD: "None of the above.",
        correctAnswer: 'answerB'
    },
    {
        question: "Which built-in method returns the characters in a string beginning at the specified location?",
        choiceA: "substr()", 
        choiceB: "getSubstring()", 
        choiceC: "slice()", 
        choiceD: "None of the above.",
        correctAnswer: 'answerA'
    },
    {
        question: "Which of the following function of Number object defines how many total digits to display of a number?",
        choiceA: "toExponential()", 
        choiceB: "toFixed()", 
        choiceC: "toLocaleString()", 
        choiceD: "toPrecision()",
        correctAnswer: 'answerD'
    },
  ];

//Constants
var currentQuestionIndex = 0;
var finalQuestionIndex = myQuestions.length;
var score = 0;
var timePenalty = 10;
var totalTime = 60
var correct;
var seconds;


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
        finalScore.innerHTML=score;
        maxScore.innerHTML=myQuestions.length
        seconds = 0;
        timer.innerHTML= seconds;
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
function tickingTime(){
    
    var countdown = setInterval(function(){
        if (seconds>0){
            seconds--;
            timer.innerHTML= seconds;
        } else{
            alert("Quiz done! You finished or ran out of time!")
            clearInterval(countdown);
            openInitPG();
            //input action when timer runs out
        }
    }, 1000);
};

//Generate Question Function
function generateQuestion(){
    thisQnum = currentQuestionIndex + 1;
    if (currentQuestionIndex === finalQuestionIndex){
        openInitPG();
        //timer=0
    } else {
        var currentQuestion = myQuestions[currentQuestionIndex];
        questionText.innerHTML = currentQuestion.question;
        questionNumber.innerHTML = thisQnum;
        answerA.innerHTML = currentQuestion.choiceA;
        answerB.innerHTML = currentQuestion.choiceB;
        answerC.innerHTML = currentQuestion.choiceC;
        answerD.innerHTML = currentQuestion.choiceD;
    }
};

// function for start quiz button being pressed
startButton.onclick = function(){
    seconds = totalTime;
    tickingTime();
    openQuestPG();
};

// function for last question being answered
function checkAnswer(answer){
    correct = myQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Correct!");
        currentQuestionIndex++;
        generateQuestion();
        //display in the results div that the answer is correct.
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        // If incorrect, subtract 10sec from timer
        seconds = seconds - timePenalty;
        alert("Incorrect!")
        currentQuestionIndex++;
        generateQuestion();
        //display in the results div that the answer is wrong.
    } else{
        openInitPG();
    };
};



//initals page submit button
submitScore.onclick = function(){
    openScorePG();
};

//initals page submit button
replayButton.onclick = function(){
    currentQuestionIndex = 0;
    timer.innerHTML = totalTime;
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