
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

var nextQuestion;
var usedQuestions = [];

function getQuestion(questions) {
    //pick question at random.
    var nextQuestion = questions[Math.floor(Math.random() * questions.length)];
    usedQuestions.push(nextQuestion);
    return nextQuestion
}

function paintQuestion(question) {
    var container = document.getElementById('question');
    var ask = document.createElement('h1');
    ask.appendChild(document.createTextNode(question.title));
    var ul = document.createElement('ul');
    ul.className = 'list-group';

        
    question.choices.forEach(function(choice) {
        //create and append list items
        var li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center text-body';
        li.appendChild(document.createTextNode(choice));
        ul.appendChild(li);
        //
        })
    console.log(ul);
    container.appendChild(ask);
    container.appendChild(ul);
}

function handleQuestion(nextQuestion) {
  var answer;
  var listItems = document.querySelectorAll('.list-group-item');
  listItems.forEach(function(choice) {
    choice.addEventListener('click', function(event) {
        console.log(event.currentTarget.textContent);
        if (event.currentTarget.textContent == nextQuestion.answer) {
            newQuestion();

        }  else {
            answer = false;
        }
        console.log(answer);
    })
  })
 }

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
 
})
