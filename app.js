/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

var dicePrevious0 = [];
var dicePrevious1 = [];

var scoreLimit = 100;

init();

dice = Math.floor(Math.random() * 6) + 1;

document.querySelector(".btn-roll").addEventListener("click", function() {

    if (gamePlaying) {

        // 1. Random number
        var dice0 = Math.floor(Math.random() * 6) + 1;
        console.log(dice0);

        var dice1 = Math.floor(Math.random() * 6) + 1;
        console.log(dice1);

        // Push value into previous dice rolls array
        dicePrevious0.push(dice0);
        dicePrevious1.push(dice1);

        // 2. Display the result
        var diceDOM0 = document.querySelector(".dice-0");
        diceDOM0.style.display = "block";
        diceDOM0.src = "dice-" + dice0 + ".png";

        var diceDOM1 = document.querySelector(".dice-1");
        diceDOM1.style.display = "block";
        diceDOM1.src = "dice-" + dice1 + ".png";

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice0 !== 1 && dice1 !== 1) {

            // If dice roll is the same as the last turn and is a six
            if ((dice0 === dicePrevious0[dicePrevious0.length - 2] && dice0 === 6) || (dice1 === dicePrevious1[dicePrevious1.length - 2] && dice1 === 6)) {

                scores[activePlayer] = 0;
                document.querySelector("#score-" + activePlayer).textContent = "0";
                console.log("Rolled same as last time, score reset.");

                nextPlayer();

            } else {

                //Add Score
                roundScore += dice0 + dice1;
                document.querySelector("#current-" + activePlayer).textContent = roundScore;

            }

        } else {

            scores[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = "0";
            console.log("Rolled a 1, score reset.");

            nextPlayer();

            }

        }

    }

);

document.querySelector(".btn-hold").addEventListener("click",function() {

    if (gamePlaying) {

    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= scoreLimit) {
        document.querySelector("#name-" + activePlayer).textContent = "Winner!";
        document.querySelector(".dice-0").style.display = "none";
        document.querySelector(".dice-1").style.display = "none";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        gamePlaying = false;
    } else {
        nextPlayer();
    }

    }

});

function nextPlayer () {

    //Next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // Clear previous dice rolls array when new player turn begins
    dicePrevious0 = [];
    dicePrevious1 = [];

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    //document.querySelector(".player-0-panel").classList.remove("active");
    //document.querySelector(".player-1-panel").classList.add("active");

    document.querySelector(".dice-0").style.display = "none";
    document.querySelector(".dice-1").style.display = "none";
}

document.querySelector(".score-input-button").addEventListener("click", function(){

    scoreLimit = document.getElementById("score-input").value;

})

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    dicePrevious0 = [];
    dicePrevious1 = [];

    document.querySelector(".dice-0").style.display = "none";
    document.querySelector(".dice-1").style.display = "none";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    document.querySelector(".player-0-panel").classList.add("active");

    gamePlaying = true;
}














