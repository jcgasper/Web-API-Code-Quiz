//QUERY SELECTORS
var questionElement = document.querySelector(".question-text");
var scoreElement = document.querySelector(".score");
var startButton = document.querySelector(".start-button");
var qButtonElement = document.querySelector(".buttonDiv");
var containerEl = document.querySelector(".container");
var timerElement = document.querySelector(".timer");
var highScore = document.querySelector(".highScore");
var highScoretxt = document.querySelector(".highscore-text");
var scoreListEl = document.querySelector(".score-list");
var endgameScreen = document.querySelector(".endgame-screen");
var feedbackElement = document.querySelector(".feedback");
var formElement = document.querySelector(".form-input");
var formButton = document.querySelector(".input-form")
var resetButton = document.querySelector(".reset-score");
var playAgain = document.querySelector(".play-again");
var displayButtons = document.querySelector(".end-buttons");
var highscoreDiv = document.getElementsByName(".highscore-box");
//Answer buttons
var button1 = document.querySelector(".button-1");
var button2 = document.querySelector(".button-2");
var button3 = document.querySelector(".button-3");
var button4 = document.querySelector(".button-4");
//Array of buttons 
var buttonArray = [button1, button2, button3, button4,];



// DECLARE VARIABLES
var timer;
var timerCount;
var score;
var scoreCount = 0;
var gameEnd = false;
var questionString;
var win = false;
var targetEl;
var answerCheck;
var runCount = 0;
var userName;
// ARRAYS

var randomArray = [];
var randomAnswers = [];
var simpleArray = [0,1,2,3]
var scoreArrayObject = [];
var localSessionArray = [];
//wrong answers for each question (going to make at least 5 real questions)
//object to replace the billion question arrays
QuestionObj1 = {Question: "q1", answers: ["a1","a2","a3","a4"], correctAnswer: "a1"};
QuestionObj2 = {Question: "q2", answers: ["a1","a2","a3","a4"], correctAnswer: "a1"};
QuestionObj3 = {Question: "q3", answers: ["a1","a2","a3","a4"], correctAnswer: "a1"};
QuestionObj4 = {Question: "q4", answers: ["a1","a2","a3","a4"], correctAnswer: "a1"};
QuestionObj5 = {Question: "q5", answers: ["a1","a2","a3","a4"], correctAnswer: "a1"};

objectArray = [QuestionObj1,QuestionObj2,QuestionObj3,QuestionObj4,QuestionObj5];


//overcomplicated varibles, consider re-writing using objects, add more questions
var questionArray = ["Question one", "Question two", "Question 3", "Question 4",];
var questionArray2 = ["Question one", "Question two", "Question 3", "Question 4",];
var answerArray = ["Test Answer One","Test Answer Two", "Test Answer Three", "Test Answer Four"];
var wrongAnswers1 = ["Q1 Fake1","Q1 Fake2","Q1 Fake3","Q1 Fake4",];
var wrongAnswers2 = ["Q2 Fake1","Q2 Fake2","Q2 Fake3","Q2 Fake4",];
var wrongAnswers3 = ["Q3 Fake1","Q3 Fake2","Q3 Fake3","Q3 Fake4",];
var wrongAnswers4 = ["Q4 Fake1","Q4 Fake2","Q4 Fake3","Q4 Fake4",];
var wrongAnswersArray = [wrongAnswers1,wrongAnswers2,wrongAnswers3,wrongAnswers4,];
var inputArray;

// V init function called when page loads
function init() {
    renderStartpage();
    } 


// start game function is called when start button is clicked.
function startGame() {
gameEnd = false;
resetScore();

renderQuiz();
startTimer();


}
//endgame function runs when time runs out, or all questions have been answered
function endGame() {
    gameEnd = true;
    renderScoreScreen();
    // run function creating end score screen
    }
    
    //quiz function is ran when timer has beeen started
    function runQuiz() {
        generateQuestions();
        generateAnswers();
        runGame();
    }
    
    function runGame() { 
        if (runCount >= randomArray.length) {
            endGame();
        }
        else {  
        matchQuestions(runCount);
        }
    }

//Startinterval timer runs whens start button is pressed
function startTimer() {
    timerCount = 60; // change to 60 to make timer a minute
    timer = setInterval(function() {
    timerCount--;
    
    timerElement.textContent = "Timer: " + timerCount;
    
    if (timerCount === 0 ) {
        //end game
        clearInterval(timer);
        endGame();
    }

    },1000);
    runQuiz();
}


//generates random array containing each question - make it so questions will not repeat
function generateQuestions() {
    // shuffles Question Array  
    randomArray = shuffleArray(questionArray2);
   
}

// randomly generates an array containing  answers matching the random question array

function generateAnswers() {

    for (let i =0; i<questionArray.length; i++) {
    
        if (randomArray[i] === questionArray[i]) {
            randomAnswers[i] = answerArray[i]
            
        }
        else {
            for (let k =0; k<questionArray.length; k++) {
                if (randomArray[i] === questionArray[k]) {
                    randomAnswers[i] = answerArray[k] }
                    
                }  
            }
        }
    
    }




function matchQuestions(i) {
    
    
    let matchNumber;
    let array = shuffleArray(simpleArray);
    questionElement.textContent = randomArray[i];     
    //outputs correct answer on screen to random button
    buttonArray[array[0]].textContent = randomAnswers[i];
    
    matchNumber = matchNum(randomArray[i]);
    //outputs wrong answers to remaining buttons
    buttonArray[array[1]].textContent = wrongAnswersArray[matchNumber][0];    
    buttonArray[array[2]].textContent = wrongAnswersArray[matchNumber][1];
    buttonArray[array[3]].textContent = wrongAnswersArray[matchNumber][2];
    
    let answerVar = randomAnswers[i];
    
    checkAnswer(answerVar);

} 

function checkAnswer(question) {
    answerCheck = question;
    

}
function matchNum(array) {
   
    let index;
    if (array ===questionArray[0]) {
        
        index = 0;
        
    }
    

    if (array ===questionArray[1]) {
        
        index = 1;
    }
    
    if (array ===questionArray[2]) {
        
        index = 2;
    }
    
    if (array ===questionArray[3]) {
        
        index = 3;
    }
return index    

}



    
    //shuffles inputted array
    function shuffleArray(array) {
        for (let i = array.length -1; i > 0; i--) {
            let randNum = Math.floor(Math.random() * (i+1));
            let temp = array[i];
            array[i] = array[randNum];
            array[randNum] = temp;
            
        }
        return array;
    }


    

function scoreFunc() {
    scoreCount++;
    scoreElement.textContent = "Score: " +scoreCount;
    feedbackElement.textContent ="Correct! ⭐"

}

function resetScore() {
    if (scoreCount != 0) {
        scoreCount = 0;
        scoreElement.textContent = "";
    }
    else {
        return;
    }
}


function highScoreScreen() {
    renderhighScore();
    
    if (scoreArrayObject.length == 0) {
        scoreArrayObject = JSON.parse(localStorage.getItem("high-scores"));
    }
    
    //sorts array object so that high scores are listeed first in array
    scoreArrayObject.sort(function(a,b) {
        return b.score - a.score;
    });
    
    for (let i = 0; i<scoreArrayObject.length; i++) {
    createList = document.createElement("li");
    createList.textContent = scoreArrayObject[i].name +" Score: " + scoreArrayObject[i].score;
    scoreListEl.appendChild(createList);
    
    } 
}


function clearHighscore() {
    localStorage.clear();
    scoreListEl.textContent = "";

}

function playAgainFunc() {
    highScoretxt.textContent = "";
    scoreListEl.textContent = "";
    renderStartpage();
    //startGame();
}

function inputScore(event) {
    event.preventDefault();
    let userInput = formElement.value;
    let inputScore = scoreCount;
    
    var highScoreObj = {name: "", score: 0};
    highScoreObj.name = userInput;
    highScoreObj.score = inputScore;
        //if local storage is empty, create new storage item
    if (localStorage.getItem("high-scores") === null) {
        scoreArrayObject.push(highScoreObj);
        localStorage.setItem("high-scores", JSON.stringify(scoreArrayObject));
    }
    else {
        scoreArrayObject = JSON.parse(localStorage.getItem("high-scores"));
        scoreArrayObject.push(highScoreObj);
        localStorage.setItem("high-scores", JSON.stringify(scoreArrayObject));
    }
    //load high score screen function
    highScoreScreen();
}
//page rendering - section of functions that control displayed elements
function renderStartpage () {
    //hide page elements except for start button, and highscore page button
    containerEl.setAttribute("style","display:none;");
    scoreElement.setAttribute("style","display:none;");
    timerElement.setAttribute("style","display:none;");
    displayButtons.setAttribute("style","display:none");
    feedbackElement.textContent ="";
    //display possibly hidden elements
    highScore.setAttribute("style","display:inherit;");
    startButton.setAttribute("style","display:flex;");
}

function renderQuiz() {
    //Render quizbox & related elements, hide non-related elements
    containerEl.setAttribute("style","display:inherit;"); //display quizbox
    scoreElement.setAttribute("style","display:inherit;"); //display score
    timerElement.setAttribute("style","display:inherit;"); // display timer
    startButton.setAttribute("style","display:none;");     // hide start button
    highScore.setAttribute("style","display:none;"); // hides highscore button
    displayButtons.setAttribute("style","display:none");
    feedbackElement.textContent ="";
    
    
}

function renderhighScore() {
    startButton.setAttribute("style","display:none;"); 
    highScore.setAttribute("style","display:none;"); // hides highscore button
    displayButtons.setAttribute("style","display:inherit;");
    endgameScreen.setAttribute("style","display:none;");
    timerElement.setAttribute("style","display:none;");
    scoreElement.setAttribute("style","display:none;");
    //hide wrong!/correct 
    highScoretxt.textContent = "Highscores!";

}
function renderScoreScreen() {
    feedbackElement.textContent ="";
    endgameScreen.setAttribute("style","display:inherit;"); //display end score screen
    containerEl.setAttribute("style","display:none;"); //hide question box
    //hide Wrong/correct, timer, and reset button

    }

//page buttons event listeners
// start button - start game
startButton.addEventListener("click", startGame);
//reset score button
resetButton.addEventListener("click", clearHighscore);
//play again button
playAgain.addEventListener("click", playAgainFunc);
//form submit button
formButton.addEventListener("submit",inputScore);
//view highscore button
highScore.addEventListener("click",highScoreScreen)

//listers for each button (using 1 class was for each button was not working for me)
button1.addEventListener("click",function(event) {
    //returns  textcontent of clicked box    
    targetEl = event.target.textContent;
    if (targetEl === answerCheck) {
        scoreFunc();
        
        runCount++;
            runGame();
    }
    else {
        feedbackElement.textContent = "Wrong!";
        timerCount--;
    }
    
    });
    

    button2.addEventListener("click",function(event) {
        //returns  textcontent of clicked box    
        targetEl = event.target.textContent;
        if (targetEl === answerCheck) {
            scoreFunc();
            
            runCount++;
            runGame();
        }
        else {
            feedbackElement.textContent = "Wrong!";
            timerCount--;
        }
        
    });

button3.addEventListener("click",function(event) {
    //returns  textcontent of clicked box    
    targetEl = event.target.textContent;
    if (targetEl === answerCheck) {
        scoreFunc();
                
        runCount++;
        runGame();
    }
        else{
        feedbackElement.textContent = "Wrong!";
            timerCount--;
            }    
        });

button4.addEventListener("click",function(event) {
        //returns  textcontent of clicked box    
        targetEl = event.target.textContent;
            if (targetEl === answerCheck) {
                scoreFunc();
                runCount++;
                 runGame();
                }
                else {
                    feedbackElement.textContent = "Wrong!";
                    timerCount--;
                }    
            });

// INITILIZING START OF PAGE
init();
