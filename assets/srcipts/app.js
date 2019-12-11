
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

var player = document.querySelector('.player'),
    nextQuestion, 
    timeLeft,
    usedQuestions = [],
    wrongCount = 0,
    choseWisely = 0;

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
        li.className = 'list-group-item list-group-item-action text-body';
        li.appendChild(document.createTextNode(choice));
        ul.appendChild(li);
        })
    console.log(ul);
    container.appendChild(ask);
    container.appendChild(ul);
}

function runClock(remainTime) {
    var startTime = Date.now();


    function timer() {
        //ellapsed time
        timeLeft = new Date((remainTime - wrongCount) - ((Date.now() - startTime)));
    }
    timer();  //start now.
    showTime(); //show now.
    setInterval(function() {
        timer() 
        showTime()
    }, 1000);
}

function showTime() {
    var timeString = document.getElementById('timer'),
        mins = timeLeft.getMinutes(),
        secs = timeLeft.getSeconds();
          
        secs = secs < 10 ? "0" + secs : secs;
        
        timeString.textContent = mins + ":" + secs;
 }

 function dockTime() {
   wrongCount += 15000;
}
  
function handleQuestion(nextQuestion) {
  var listItems = document.querySelectorAll('.list-group-item');

  listItems.forEach(function(choice) {
    choice.addEventListener('click', function(event) {
        console.log(event.currentTarget.textContent);
        var click = event.currentTarget;
        if (click.textContent == nextQuestion.answer) {
            click.className = 'form-control is-valid';
            setTimeout(newQuestion, 1000)
            choseWisely ++;
            console.log(choseWisely);
            
        } else {
            click.className = 'form-control is-invalid';
            var flash = setInterval(flashTimer, 200) 
            dockTime();
            setTimeout(function() { 
                clearInterval(flash)
                resetColor()
                paintQuestion(nextQuestion)
                handleQuestion(nextQuestion)
            }, 1000);
        }
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
 function flashTimer() {
    var flash = document.getElementById('timer');
    
    flash.style.color = (flash.style.color == 'red' ? '#212529' : 'red');  
 }
 function resetColor() {
     document.getElementById('timer').style.color = '#212529';
 }
 
 function getScores() {
   var scores;
    if(localStorage.getItem('scores') === null){
    scores = [];
    } else {
    scores = JSON.parse(localStorage.getItem('scores'));
    }
    var container = document.getElementById('scores'),
        table = document.createElement('table'),
        header;
    table.className = 'table table-hover';
    header.innerHTMl = `<thead>
    <tr>
      <th scope="col">Name/th>
      <th scope="col">Number of Correct Answers</th>
      <th scope="col">Number of Mistakes</th>
    </tr>
  </thead>`;
    table.appendChild(header);

    scores.forEach(function(score) {
    var tr = document.createElement('tr');

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');

    var text1 = document.createTextNode(score.name);
    var text2 = document.createTextNode(score.wise);
    var text2 = document.createTextNode(score.poor);

    td1.appendChild(text1);
    td2.appendChild(text2);
    tr.appendChild(td1);
    tr.appendChild(td2);

    table.appendChild(tr);
    })

 }

 function setGameInLocalStorage(player) {
    let players;
    if(localStorage.getItem('players') === null){
        players = [];
     } else {
            players = JSON.parse(localStorage.getItem('players'));
         }
    players.push(player);
    
    localStorage.setItem(players);
    localStorage.setItem(choseWisely);
}

 function endGame() {
    document.querySelector('.add').addEventListener('click', addScore);

   
  }

  function addScore() {
     if (player.value === '') {
       alert('Please enter your name first');  
     } 
   };

document.querySelector('.welcome').style.display = "none";

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

