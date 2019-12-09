
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
var usedQuestions = [];
function getQuestion(questions) {
    //pick question at random.
    var nextQuestion = questions[Math.floor(Math.random() * questions.length)];
    usedQuestions.push(nextQuestion);
    return nextQuestion
}
function paintQuestion(question) {
    var container = document.getElementById('question');
    var listLength = question.choices.length;
    if (listLength > 0){
        var ask = document.createElement('h1');
        // ask.className = 'display-3';
        ask.appendChild(document.createTextNode(question.title));
        var ul = document.createElement('ul');
        ul.className = 'list-group text-white';
        
        for (var i=0; i < question.choices.length; i++) {
          var li = document.createElement('li');
          li.className = 'list-group-item d-flex justify-content-between align-items-center text-body';
          var liValue = document.createTextNode(question.choices[i]);
          li.appendChild(liValue);
          ul.appendChild(li);
        }
        console.log(ul);
        container.appendChild(ask);
        container.appendChild(ul);
    } else {
        var message = document.createTextNode('Oh no!! Something went terribly wrong');
        container.appendChild(message);
    }

}

document.querySelector(".begin").addEventListener("click", function() {
    // swishIn();

    var nextQuestion = getQuestion(questions);
    //confirm next question is unused. 
    nextQuestion = nextQuestion.constructor === usedQuestions ? getQuestion() : nextQuestion;
    console.log(nextQuestion);
    console.log(usedQuestions);

    paintQuestion(nextQuestion);
    
    
})
