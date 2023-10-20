const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        lives: document.querySelector('#lives'),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        livesCurrent: 3,
    },
    action: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function randomSquare(){
    state.view.squares.forEach(square => {
        square.classList.remove('enemy')
    })

    let randomNumber = Math.floor(Math.random() * state.view.squares.length);
    let randomSquare = state.view.squares[randomNumber];

    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.action.countDownTimerId);
        clearInterval(state.action.timerId);
        alert('Game Over! O seu resultado foi: ' + state.values.result);
        reset();
    }
}

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function reset(){
    state.values.currentTime = 60;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.values.livesCurrent = 3;
    state.view.lives.textContent = `x${state.values.livesCurrent}`;
    state.values.result = 0;
    state.view.score.textContent = state.values.result;
    state.action.countDownTimerId = setInterval(countDown, 1000);
    state.action.timerId = setInterval(randomSquare, 1000);
}

function addListenerHitBox(){
    state.view.squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }else{
                state.values.livesCurrent--;
                state.view.lives.textContent = `x${state.values.livesCurrent}`;
                if(state.values.livesCurrent <= 0){
                    clearInterval(state.action.countDownTimerId);
                    clearInterval(state.action.timerId);
                    alert('Game Over! O seu resultado foi: ' + state.values.result);
                    reset();
                }
            }
        })
    })
}

function initialize(){
    addListenerHitBox();
}

initialize();