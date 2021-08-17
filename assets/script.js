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



// DECLARE VARIABLES
var timer;
var timerCount;
var score;
var scoreCount;
var gameEnd = false;
var questionString;

// ARRAYS
var questionArray = ["Question one", "Question two", "Question 3", "Question 4", "Question 5"];
var answerArray = ["Test Answer One","Test Answer Two", "Test Answer Three", "Test Answer Four"];
var randomArray = [];
var randomAnswers = [];

// V init function called when page loads
function init() {
    renderStartpage();

} 
// start game function is called when start button is clicked.
function startGame() {
gameEnd = false;
timerCount = 5; // change to 60 to make timer a minute
startButton.disabled = true;
renderQuiz();
startTimer();


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
endgameScreen.setAttribute("style","display:inherit;"); //display end score screen
containerEl.setAttribute("style","display:none;"); //hide question box
gameEnd = true;

// push score to screen
}


// PAGE RENDERING

function renderStartpage () {
    //hide page elements except for start button, and highscore page button
    containerEl.setAttribute("style","display:none;");
    scoreElement.setAttribute("style","display:none;");
    timerElement.setAttribute("style","display:none;");
    
    
    //display hidden elements

}

function renderQuiz() {
    //Render quizbox & related elements, hide non-related elements
    containerEl.setAttribute("style","display:inherit;"); //display quizbox
    scoreElement.setAttribute("style","display:inherit;"); //display score
    timerElement.setAttribute("style","display:inherit;"); // display timer
    startButton.setAttribute("style","display:none;");     // hide start button
    highScore.setAttribute("style","display:none;"); // hides highscore button

}


function runQuiz() {
    
    generateQuestions();
    generateAnswers();
    

}

function generateQuestions() {
    for (let i = 0; i<questionArray.length; i++) {
        let qIndex = Math.floor(Math.random() *questionArray.length)
         randomArray[i] = questionArray[qIndex];
     
         }
     console.log(randomArray);
     questionElement.textContent = randomArray[0];
     

}

function generateAnswers() {
// generate answer array to match question array will include each answer in each question prompt
// for loop that checks each index in RandomArray, then checks each index of Q array to find match
// take index of matching question, and make generated answer match. do this for each array and you should
//have matching randomly generate Q and A arrays
}



//event listeners
startButton.addEventListener("click", startGame);

// INITILIZING START OF PAGE



init();




//

















//