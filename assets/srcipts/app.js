
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
        timeLeft = new Date((remainTime - (wrongCount*15000)) - ((Date.now() - startTime)));
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
   wrongCount ++;
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
   var players;
    if(localStorage.getItem('players') === null){
    players = [];
    } else {
    players = JSON.parse(localStorage.getItem('players'));
    }
    var container = document.getElementById('storage'),
        table = document.createElement('table'),
        header = document.createElement('tr'),
        nameHeader = document.createElement('th'),
        correctHeader = document.createElement('th'),
        wrongtHeader = document.createElement('th');
    //generate table heading
    correctHeader.setAttribute('scope', 'col');
    wrongtHeader.setAttribute('scope', 'col');
    var nameText = document.createTextNode('Name');
    var correctText = document.createTextNode('Number of Correct Answers');
    var wrongText = document.createTextNode('Number of Mistakes');
    nameHeader.appendChild(nameText);
    correctHeader.appendChild(correctText);
    wrongtHeader.appendChild(wrongText);
    table.className = 'table table-hover';
    header.appendChild(nameHeader);
    header.appendChild(correctHeader);
    header.appendChild(wrongtHeader);
    table.appendChild(header);

    //clear out existing table
    container.textContent = '';
    
    console.log(players);

    //generate table content
    players.forEach(function(player) {
    var tr = document.createElement('tr');
    tr.setAttribute('class', 'table-active');

    var th1 = document.createElement('th');
    var th2 = document.createElement('th');
    var th3 = document.createElement('th');
    th1.setAttribute('scope', 'row');
    th2.setAttribute('scope', 'row');
    th3.setAttribute('scope', 'row');

    var text1 = document.createTextNode(player.name);
    var text2 = document.createTextNode(player.score);
    var text3 = document.createTextNode('0');

    th1.appendChild(text1);
    th2.appendChild(text2);
    th3.appendChild(text3);
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);

    table.appendChild(tr);
    })
    
    container.appendChild(table);
 }

 function storeGameInLocalStorage(player) {

    var players;
    if(localStorage.getItem('players') === null){
        players = [];
     } else {
            players = JSON.parse(localStorage.getItem('players'));
         }
     //add game to list
     players.push(player);
    
    localStorage.setItem('players', JSON.stringify(players));
}

 function endGame() { 
    
     getScores();
    document.querySelector('.add').addEventListener('click', function(event){
        
        var  player = {
        name : document.querySelector('.player-name').value,
        score : choseWisely, 
        };
    
        console.log(player);
        
        
        if (player.value === '') {
            alert('Enter your name first');
        } 
       
        storeGameInLocalStorage(player);
        getScores();
        document.querySelector('.player-name').value = '';
        event.preventDefault();
    })
  }

 endGame(); 

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

