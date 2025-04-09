
let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };

updateScoreElement();

// null = intentionally want something to be empty 
const rockElement = document.querySelector('.js-rock-button');
rockElement.addEventListener('click', () => {
    playGame('✊🏼');
});

const paperElement = document.querySelector('.js-paper-button');
paperElement.addEventListener('click', () => {
    playGame('🖐🏼');
})

const ScissorsElement = document.querySelector('.js-scissors-button');
ScissorsElement.addEventListener('click', () => {
    playGame('✌🏼');
})


document.body.addEventListener('keydown', (event) => {
    // alert(event.key);
    if (event.key === 'r') {
        playGame('✊🏼');
    }
    else if (event.key === 'p') {
        playGame('🖐🏼');
    }
    else if (event.key === 's') {
        playGame('✌🏼');
    }
    else if (event.key === 'Backspace') {
        showResetConfirmation();
    }
});
document.querySelector('.js-reset-button').addEventListener('click', () => {
    showResetConfirmation();
})


function showResetConfirmation() {
    document.querySelector('.js-reset-confirmation').innerHTML = `
    Are you sure you want to reset the score?
    <button class="js-reset-confirm-yes reset-confirm-button">
    Yes
    </button>
     <button class="js-reset-confirm-no reset-confirm-button">
        No
      </button>`;
    document.querySelector('.js-reset-confirm-yes').addEventListener('click', () => {

        hideResetConfirmation();
        resetScore();
    });

    document.querySelector('.js-reset-confirm-no')
        .addEventListener('click', () => {
            hideResetConfirmation();
        });

}
function hideResetConfirmation() {
    document.querySelector('.js-reset-confirmation').innerHTML = '';
}


function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';
    if (playerMove === '✌🏼') {
        if (computerMove === '✊🏼') {
            result = 'You Lose';
        }
        else if (computerMove === '🖐🏼') {
            result = 'You Win';
        }
        else if (computerMove === '✌🏼') {
            result = 'Tie';
        }
    }
    else if (playerMove === '🖐🏼') {

        if (computerMove === '✊🏼') {
            result = 'You Win';
        }
        else if (computerMove === '🖐🏼') {
            result = 'Tie';
        }
        else if (computerMove === '✌🏼') {
            result = 'You Lose';
        }
    }
    else if (playerMove === '✊🏼') {
        if (computerMove === '✊🏼') {
            result = 'Tie';
        }
        else if (computerMove === '🖐🏼') {
            result = 'You Lose';
        }
        else if (computerMove === '✌🏼') {
            result = 'You Win';
        }
    }

    const resultElement = document.querySelector('.js-result');

    if (result === 'You Win') {
        // score.wins = score.wins + 1;
        score.wins += 1;

        resultElement.classList.add('win');
        resultElement.classList.remove('lose');
        resultElement.classList.remove('tie');



    } else if (result === 'You Lose') {
        // score.losses = score.losses + 1;
        score.losses += 1;

        resultElement.classList.add('lose');
        resultElement.classList.remove('win');
        resultElement.classList.remove('tie');
    }
    else if (result === 'Tie') {
        // score.ties = score.ties + 1;
        score.ties += 1;

        resultElement.classList.add('tie');
        resultElement.classList.remove('win');
        resultElement.classList.remove('lose');
    };

    localStorage.setItem('score', JSON.stringify(score));


    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML =
        `You ${playerMove} - ${computerMove} Computer`;

    // alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}\nWins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);

}


function updateScoreElement() {
    document.querySelector('.js-score').innerHTML =
        `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties};`
}
// let computerMove = '';

//Return = gets a value out of a function
//Parameter = Puts a value into a function
function pickComputerMove() {
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = '✊🏼';
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = '🖐🏼';
    }
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = '✌🏼';
    }
    return computerMove;
}
function resetScore() {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.setItem('score', JSON.stringify(score));
}

function resetButton() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}
let isAutoPlaying = false;
let intervalId;


const autoPlayElement = document.querySelector(".js-auto-play-button");
autoPlayElement.addEventListener('click', autoPlay);

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        autoPlay();
    }
});

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000)
        autoPlayElement.innerHTML = "Stop Playing";
        isAutoPlaying = true;
    }
    else {
        clearInterval(intervalId);
        autoPlayElement.innerHTML = "Auto Play";
        isAutoPlaying = false;

    }
}