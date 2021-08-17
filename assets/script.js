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
var questionArray = ["Question one", "Question two", "Question 3", "Question 4",];
console.log(questionArray)
var questionArray2 = ["Question one", "Question two", "Question 3", "Question 4",];
var answerArray = ["Test Answer One","Test Answer Two", "Test Answer Three", "Test Answer Four"];
var randomArray = [];
var randomAnswers = [];
var simpleArray = [0,1,2,3]
var scoreArrayObject = [];
//wrong answers for each question (going to make at least 5 real questions)

var wrongAnswers1 = ["Q1 Fake1","Q1 Fake2","Q1 Fake3","Q1 Fake4",];
var wrongAnswers2 = ["Q2 Fake1","Q2 Fake2","Q2 Fake3","Q2 Fake4",];
var wrongAnswers3 = ["Q3 Fake1","Q3 Fake2","Q3 Fake3","Q3 Fake4",];
var wrongAnswers4 = ["Q4 Fake1","Q4 Fake2","Q4 Fake3","Q4 Fake4",];
var wrongAnswersArray = [wrongAnswers1,wrongAnswers2,wrongAnswers3,wrongAnswers4,];

// V init function called when page loads
function init() {
    renderStartpage();
    
} 

function renderStartpage () {
    //hide page elements except for start button, and highscore page button
    containerEl.setAttribute("style","display:none;");
    scoreElement.setAttribute("style","display:none;");
    timerElement.setAttribute("style","display:none;");
    
    
    //display hidden elements

}
// start game function is called when start button is clicked.

function startGame() {
gameEnd = false;
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

}


//Startinterval timer
function startTimer() {
    
    timer = setInterval(function() {
    timerCount--;
    
    console.log(timerCount)
    
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
    
    endgameScreen.setAttribute("style","display:inherit;"); //display end score screen
    containerEl.setAttribute("style","display:none;"); //hide question box
    

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
    console.log("answer chk " + answerCheck);

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
   console.log(questionArray);
    let index;
    if (array ===questionArray[0]) {
        console.log("match");
        index = 0;
        
    }
    

    if (array ===questionArray[1]) {
        console.log("match");
        index = 1;
    }
    
    if (array ===questionArray[2]) {
        console.log("match");
        index = 2;
    }
    
    if (array ===questionArray[3]) {
        console.log("match");
        index = 3;
    }
return index    

}


function scoreFunc() {
    scoreCount++;
    scoreElement.textContent = "Score: " +scoreCount;
    feedbackElement.textContent ="Correct! ⭐"

}









// INITILIZING START OF PAGE
init();
//start button event listener
startButton.addEventListener("click", startGame);




formButton.addEventListener("submit",inputScore);

function inputScore(event) {
    event.preventDefault();
    let userInput = formElement.value;
    let inputScore = scoreCount;
    console.log(userName + " " + scoreCount);
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
    console.log(scoreArrayObject);
}

//listers for each button (using 1 class was for each button was not working for me)
button1.addEventListener("click",function(event) {
    //returns  textcontent of clicked box    
    targetEl = event.target.textContent;
    if (targetEl === answerCheck) {
        scoreFunc();
        console.log("SCORE");
        runCount++;
            runGame();
    }
    
    
    });
    

    button2.addEventListener("click",function(event) {
        //returns  textcontent of clicked box    
        targetEl = event.target.textContent;
        if (targetEl === answerCheck) {
            scoreFunc();
            console.log("SCORE");
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
                console.log("SCORE");
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
                    console.log("SCORE");
                    runCount++;
            runGame();
                }
                if (targetEl != answerCheck) {
                    feedbackElement.textContent = "Wrong!";
                }    
            });
