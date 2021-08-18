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

//overcomplicated varibles, consider re-writing using objects
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

function renderStartpage () {
    //hide page elements except for start button, and highscore page button
    containerEl.setAttribute("style","display:none;");
    scoreElement.setAttribute("style","display:none;");
    timerElement.setAttribute("style","display:none;");
    displayButtons.setAttribute("style","display:none");
    startButton.setAttribute("style","display:flex;");
    highScore.setAttribute("style","display:inherit;");
    feedbackElement.textContent ="";
    
    //display hidden elements

}
// start game function is called when start button is clicked.

function startGame() {
gameEnd = false;
resetScore();
timerCount = 5; // change to 60 to make timer a minute
renderQuiz();
startTimer();


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


//Startinterval timer
function startTimer() {
    
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

function endGame() {
    gameEnd = true;
    scoreScreen();
    // run function creating end score screen
    }
    
    function scoreScreen() {
    feedbackElement.textContent ="";
    endgameScreen.setAttribute("style","display:inherit;"); //display end score screen
    containerEl.setAttribute("style","display:none;"); //hide question box
    //hide Wrong/correct, timer, and reset button

    }

function runQuiz() {
    
    generateQuestions();
    generateAnswers();
    runGame();
    

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


function runGame() { 
    if (runCount >= randomArray.length) {
        runCount = 0;
    }  
    matchQuestions(runCount);

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
    startButton.setAttribute("style","display:none;"); 
    highScore.setAttribute("style","display:none;"); // hides highscore button
    displayButtons.setAttribute("style","display:inherit;");
    endgameScreen.setAttribute("style","display:none;");
    timerElement.setAttribute("style","display:none;");
    scoreElement.setAttribute("style","display:none;");
    //hide wrong!/correct 
    highScoretxt.textContent = "Highscores!";
    console.log(scoreArrayObject);
    
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


// INITILIZING START OF PAGE
init();
//start button event listener
startButton.addEventListener("click", startGame);

resetButton.addEventListener("click", clearHighscore);
playAgain.addEventListener("click", playAgainFunc);

formButton.addEventListener("submit",inputScore);
highScore.addEventListener("click",highScoreScreen)

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


//listers for each button (using 1 class was for each button was not working for me)
button1.addEventListener("click",function(event) {
    //returns  textcontent of clicked box    
    targetEl = event.target.textContent;
    if (targetEl === answerCheck) {
        scoreFunc();
        
        runCount++;
            runGame();
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
        if (targetEl != answerCheck) {
            feedbackElement.textContent = "Wrong!";
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
            if (targetEl != answerCheck) {
                feedbackElement.textContent = "Wrong!";
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
                if (targetEl != answerCheck) {
                    feedbackElement.textContent = "Wrong!";
                }    
            });
