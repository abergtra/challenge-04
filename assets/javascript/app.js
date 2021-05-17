
  
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var startButton = document.getElementById('startup');
var timer = document.getElementById('timer'); 
var byeHead = document.getElementById('head');

var testButton = document.getElementById('test');
var testextContainer = document.getElementById('testext');
var testextContainer2 = document.getElementById('testext2');
testextContainer.style.display = "none";
testextContainer2.style.display = "none";

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
}

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

	function showQuestions(questions, quizContainer){
        // we'll need a place to store the output and the answer answer
        var output = [];
        var answers;
    
        // for each question...
        for(var i=0; i<questions.length; i++){
            
            // first reset the list of answers
            answers = [];
    
            // for each available answer to this question...
            for(letter in questions[i].answers){
    
                // ...add an html radio button
                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }
    
            // add this question and its answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }
    
        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }

	function showResults(questions, quizContainer, resultsContainer){
	
        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');
        
        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;
        
        // for each question...
        for(var i=0; i<questions.length; i++){

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
            // if answer is correct
            if(userAnswer===questions[i].correctAnswer){
                // add to the number of correct answers
                numCorrect++;
                
                // color the answers green
                answerContainers[i].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[i].style.color = 'red';
            }
        }

        // show number of correct answers out of total
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }

	// show the questions
	showQuestions(questions, quizContainer);

	// when user clicks submit, show results
	submitButton.onclick = function(){
		showResults(questions, quizContainer, resultsContainer);
	}
}

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);
tickingTime(timer);

var visible = true;
startButton.onclick = function(){

    if (visible){
        byeHead.style.display = "none";
        visible = false;
    } else {
        byeHead.style.display = "block";
        visible = true;
    }
    //block to come back
}

var visibleTest = 0;
testButton.onclick = function(){

    if (visibleTest==0){
        quizContainer.style.display = "none";
        testextContainer.style.display = "block";
        testextContainer2.style.display = "none";
        visibleTest++;
    } else if (visibleTest==1){
        quizContainer.style.display = "none";
        testextContainer.style.display = "none";
        testextContainer2.style.display = "block";
        visibleTest++;
    } else {
        quizContainer.style.display = "block";
        testextContainer.style.display = "none";
        testextContainer2.style.display = "none";
        visibleTest = 0;
    }
    //block to come back
}