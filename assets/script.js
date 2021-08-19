//QUERY SELECTORS
var questionElement = document.querySelector(".question-text");
var scoreElement = document.querySelector(".score");
var startButton = document.querySelector(".start-button");
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
var targetEl;
var answerCheck;
var runCount;
var userName;
// ARRAYS

//local storage/highscore arrays
var scoreArrayObject = [];
var localSessionArray = [];

//question objects complete question list, at least 10
QuestionObj1 = {Question: "How is Javascript related to Java?", answers: ["There is no relation between the two","Javascript is built with Java","Java is built with Javascript","Javascript & Java are owned by the same company"], correctAnswer: "There is no relation between the two"};
QuestionObj2 = {Question: "Which description best fits Javascript?", answers: ["Programming Language","Scripting Language","Server Query Language","Cascading Style Sheets"], correctAnswer: "Scripting Language"};
QuestionObj3 = {Question: "Which of the following will display the message \"Hello\" in an alert prompt?", answers: ["alert(\"Hello\");","alertBox(\"Hello\");","alertBox(Hello;)","msgAlert(\"Hello\");"], correctAnswer: "alert(\"Hello\");"};
QuestionObj4 = {Question: "Which prompt will return the minimum of x and y using JavaScript?", answers: ["Math.min(x,y);","min(x,y);","Math.max(x,y);","minimum(x+y);"], correctAnswer: "Math.min(x,y);"};
QuestionObj5 = {Question: "What will this code return?: Boolean(1<2);", answers: ["True","False","Undefined","Null"], correctAnswer: "True"};
QuestionObj6 = {Question: "What will this code return?: Boolean(2<1);", answers: ["True","False","Undefined","Null"], correctAnswer: "False"};
QuestionObj7 = {Question: "What will this code return?: Boolean(1>2);", answers: ["True","False","Undefined","Null"], correctAnswer: "False"};
QuestionObj8 = {Question: "What will this code return?: Boolean(2>1);", answers: ["True","False","Undefined","Null"], correctAnswer: "True"};

QuestionObj9 = {Question: "How many times will code in this statement loop?: for(i=0; i<4; i++) {}", answers: ["four","five","three","infinite loop"], correctAnswer: "four"};
QuestionObj10 = {Question: "How many times will code in this statement loop?: for(i=0; i<=4; i++) {}", answers: ["four","five","three","infinite loop"], correctAnswer: "five"};
QuestionObj11 = {Question: "How many times will code in this statement loop?: for(i=0; i<4; i--) {}", answers: ["four","five","three","infinite loop"], correctAnswer: "infinite loop"};
//array containing each question object
objectArray = [QuestionObj1,QuestionObj2,QuestionObj3,QuestionObj4,QuestionObj5,QuestionObj6,QuestionObj7,QuestionObj8,QuestionObj9,QuestionObj10,QuestionObj11];


// V init function called when page loads
function init() {
    renderStartpage();
    } 


// start game function is called when start button is clicked.
function startGame() {
gameEnd = false;
runCount = 0;
shuffleQuestions();
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
        runGame();
        
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

function shuffleQuestions() {
    console.log("pre shuffle ");
    console.log(objectArray);
    //shuffles questions to display in random order
    shuffleArray(objectArray);
    
    console.log("post shuffle ");
    console.log(objectArray);

    
}


function runGame() { 
    

    if (runCount >= objectArray.length) {
        endGame();
    }
    else {  
        runQuestions();
    }
}

function runQuestions() {
    questionElement.textContent = objectArray[runCount].Question
    runAnswers();
}

function runAnswers() {
    let array = [0,1,2,3]
    shuffleArray(array);
    
    buttonArray[array[0]].textContent = objectArray[runCount].answers[0];
    buttonArray[array[1]].textContent = objectArray[runCount].answers[1];   
    buttonArray[array[2]].textContent = objectArray[runCount].answers[2];
    buttonArray[array[3]].textContent = objectArray[runCount].answers[3];

    answerCheck = objectArray[runCount].correctAnswer;
}

//shuffles inputted array found fisher-yates algorithm when frustrated trying to make my own solution
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

//renders highscore screen and creates list of highscores
function highScoreScreen() {
    renderhighScore();
    //checks if the scorearray has any values
    if (scoreArrayObject.length == 0) {
        //gets scores from localstorage if array is empty and localstorage has content
        if (localStorage.getItem("high-scores") != null) {
        scoreArrayObject = JSON.parse(localStorage.getItem("high-scores"));
        }
    }
    
    //sorts array object so that high scores are listeed first in array
    scoreArrayObject.sort(function(a,b) {
        return b.score - a.score;
    });
    //creates li elements and appends them to parent element
    for (let i = 0; i<scoreArrayObject.length; i++) {
    createList = document.createElement("li");
    createList.textContent = scoreArrayObject[i].name +" Score: " + scoreArrayObject[i].score;
    scoreListEl.appendChild(createList);
    
    } 
}

//clears highscore from localstorage and wipes list of scores
function clearHighscore() {
    localStorage.clear();
    scoreListEl.textContent = ""; //clears score list
    scoreArrayObject = []; //emptys score array

}
//clears content on screen and brings user back to start page
function playAgainFunc() {
    highScoretxt.textContent = "";
    scoreListEl.textContent = "";
    renderStartpage();
}
//takes userinput from form and stores name & score to local storage
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
//displays start page elements & hide non-related elements that may be on screen
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
    //renders all quiz elements, not including content, hides any non-related elements
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
    //renders highscore page, hide any non-related elements that may be on screen
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
//renders end score screen
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
        //checks if clicked element matches the questions answer
    if (targetEl === answerCheck) {
        //updates score
        scoreFunc();
        //updates runcount and continues game
        runCount++;
            runGame();
    }
    else {
        //if selected element does not match answer, return feedback and subtract from timer
        feedbackElement.textContent = "Wrong! 👎";
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
