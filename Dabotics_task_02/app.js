const _question = document.getElementById('question')
const _options = document.querySelector('.quiz-options')
const _correctScore = document.getElementById('correct-score')
const _totalQuestion = document.getElementById('total-question')
const _checkBtn = document.getElementById('check-answer')
const _playAgainBtn = document.getElementById('play-again')
const _result = document.getElementById('result')
const _startBtn = document.getElementById('start')
const _startScreen = document.querySelector('.container')
const _displayScreen = document.querySelector('.wrapper');


window.onload = () => {
    _startScreen.classList.remove("hide");
    _displayScreen.classList.add("hide")
}

_startBtn.addEventListener("click", () => {
    _startScreen.classList.add("hide");
    _displayScreen.classList.remove("hide")
    loadQuestion()
})

let correctAnswer = ""
let correctScore = askedCount = 0, totalQuestion = 10;

async function loadQuestion() {
    const url = 'https://opentdb.com/api.php?amount=1'
    const result = await fetch(`${url}`)
    const data = await result.json()

    _result.innerHTML = ""

    showQuestion(data.results[0]);
}

function eventListeners() {
    _checkBtn.addEventListener('click', checkAnswer)
    _playAgainBtn.addEventListener('click', restartQuiz);
}

document.addEventListener('DOMContentLoaded', function(){
    loadQuestion();
    eventListeners();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
});


function showQuestion(data){
    _checkBtn.disabled = false;
    correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
    // console.log(correctAnswer);

    
    _question.innerHTML = `${data.question} <br> <span class = "category"> ${data.category} </span>`;
    _options.innerHTML = `
        ${optionsList.map((option, index) => `
            <li> ${index + 1}. <span>${option}</span> </li>
        `).join('')}
    `;
    selectOption();
}

function selectOption(){
    _options.querySelectorAll('li').forEach(function(option){
        option.addEventListener('click', function(){
            if(_options.querySelector('.selected')){
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

function checkAnswer(){
    _checkBtn.disabled = true;
    if(_options.querySelector('.selected')){
        let selectedAnswer = _options.querySelector('.selected span').textContent;
        if(selectedAnswer == HTMLDecode(correctAnswer)){
            correctScore++;
            _result.innerHTML = `<p><i class = "fas fa-check"></i>Correct Answer!</p>`;
        } else {
            _result.innerHTML = `<p><i class = "fas fa-times"></i>Incorrect Answer!</p> <small><b>Correct Answer: </b>${correctAnswer}</small>`;
        }
        checkCount();
    } else {
        _result.innerHTML = `<p><i class = "fas fa-question"></i>Please select an option!</p>`;
        _checkBtn.disabled = false;
    }
}


function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}


function checkCount() {
    askedCount++;
    console.log(askedCount)
    setCount();
    if(askedCount == totalQuestion) {
        _result.innerHTML = `<p>Your score is ${correctScore}</p>`
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none" ;

    } else {
        setTimeout(() => {
            loadQuestion();
        }, 500);
    }
}

function setCount() {
    _totalQuestion.textContent = totalQuestion ;
    _correctScore.textContent = askedCount;

    // console.log(totalQuestion)
    // console.log(correctScore)
}

function restartQuiz(){
    correctScore = askedCount = 0;
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    setCount();
    loadQuestion();
}