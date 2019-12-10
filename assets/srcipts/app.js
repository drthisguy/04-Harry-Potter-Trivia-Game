
//revisit if we decide to animate questions in and out from the sides. 
// function swishIn() {
   
//     var elem = document.getElementById("animate");   
//     var pos = 0;
//     var id = setInterval(frame, 5);
//     function frame() {
//       if (pos == 350) {
//         clearInterval(id);
//       } else {
//         pos++; 
//         elem.style.top = pos + "5px"; 
//         elem.style.left = pos + "5px"; 
//       }
//     }  
// }

import {questions} from './questions.js';
console.log(questions);

var nextQuestion, 
    usedQuestions = [];

function getQuestion(questions) {
    //pick question at random.
    nextQuestion = questions[Math.floor(Math.random() * questions.length)];
    usedQuestions.push(nextQuestion);
    return nextQuestion
}

function paintQuestion(question) {
    document.querySelector('#question').textContent = '';
    var container = document.getElementById('question'),
        ask = document.createElement('h1'),
        ul = document.createElement('ul');

    ask.appendChild(document.createTextNode(question.title));
    ul.className = 'list-group';

    question.choices.forEach(function(choice) {
        //create and append list items
        var li = document.createElement('li');
        li.setAttribute('class','list-group-item list-group-item-action text-body');
        li.appendChild(document.createTextNode(choice));
        ul.appendChild(li);
        })
    console.log(ul);
    container.appendChild(ask);
    container.appendChild(ul);
}

function runClock(fullTime) {
    var startTime = Date.now(),
        timeLeft,
        mins,
        secs,
        timeString = document.getElementById('timer');

    function timer() {
        //ellapsed time
        timeLeft = new Date(fullTime - ((Date.now() - startTime)));

        mins = timeLeft.getMinutes();
        secs = timeLeft.getSeconds();
        
        secs = secs < 10 ? "0" + secs : secs;
        
        timeString.textContent = mins + ":" + secs;         
    };
    timer();  //start now.
    setInterval(timer, 1000);
}
  
function handleQuestion(nextQuestion) {
  var listItems = document.querySelectorAll('.list-group-item');

  listItems.forEach(function(choice) {
    choice.addEventListener('click', function(event) {
        console.log(event.currentTarget.textContent);
        var click = event.currentTarget;
        if (click.textContent == nextQuestion.answer) {
            click.className = 'form-control is-valid';
            setTimeout(newQuestion,'1000');

        } else {                       
            click.className = 'form-control is-invalid';
            setTimeout(function() { 
            paintQuestion(nextQuestion)
            handleQuestion(nextQuestion)
         }, 1000);
                
            console.log(nextQuestion);
            
        }
    })
  })
 }
function chosePoorly() {
  
 };
function newQuestion() {
    //clear last question. 
    document.querySelector('#question').textContent = '';
    nextQuestion = getQuestion(questions);
    //confirm next question is unused. 
    nextQuestion = nextQuestion.constructor == usedQuestions ? getQuestion() : nextQuestion;
    paintQuestion(nextQuestion);
    handleQuestion(nextQuestion);
 }

document.querySelector(".begin").addEventListener("click", function() {
    // swishIn();
    //hide welcome screen
    document.querySelector('.welcome').style.display = "none";

    nextQuestion = getQuestion(questions);
    //confirm next question is unused. 
    nextQuestion = nextQuestion.constructor === usedQuestions ? getQuestion() : nextQuestion;
    console.log(nextQuestion);
    console.log(usedQuestions);

    paintQuestion(nextQuestion);
    handleQuestion(nextQuestion);
    runClock(240000); //240 seconds
 
})
