let player_marbles = document.getElementsByClassName('marbles1')[0] as HTMLElement;
let opponent_marbles = document.getElementsByClassName('marbles2')[0] as HTMLElement;
let seconds = document.getElementsByClassName('timer')[0].lastElementChild as HTMLElement;

let player_marbles_observer = new MutationObserver(playerMarblesEvent);
player_marbles_observer.observe(player_marbles, { childList: true });

let opponent_marbles_observer = new MutationObserver(opponentMarblesEvent);
opponent_marbles_observer.observe(opponent_marbles, { childList: true });

let timer_observer = new MutationObserver(timerEvent);
timer_observer.observe(seconds, { childList: true, characterData: true });

function playerMarblesEvent(): void {
    let nbr_marbles = player_marbles.getElementsByTagName('img').length;
    if (nbr_marbles === 0) gameOver(gameOverLose());
}

function opponentMarblesEvent(): void {
    let nbr_marbles = opponent_marbles.getElementsByTagName('img').length;
    if (nbr_marbles === 0) gameOver(gameOverWin());
}

function timerEvent(): void {
    let minutes = document.getElementsByClassName('timer')[0].firstElementChild as HTMLElement;
    if (minutes.textContent === '00' && seconds.textContent === '00') {
        gameOver(gameOverLose());
    }
}

function gameOver(callBack: void): void {
    // hide numberMarbles inputs and resultGame button
    document.getElementById('numberMarbles')?.setAttribute('style', 'display: none');
    document.getElementById('numberMarbles2')?.setAttribute('style', 'display: none');
    document.getElementById('resultGame')?.setAttribute('style', 'display: none');

    // hide fight area background
    /* document.getElementsByClassName('ringBoxe')[0].setAttribute('style', 'display: none'); */

    // hide bets and marbles button and inputs
    document.getElementById('betMarbles')?.setAttribute('style', 'display: none');
    document.getElementById('numberMarblesHand')?.setAttribute('style', 'display: none');
    document.getElementById('betMarbles2')?.setAttribute('style', 'display: none');
    document.getElementById('numberMarblesHand2')?.setAttribute('style', 'display: none');

    // hide marbles
    /* document.getElementsByClassName('charactersMarbles')[0].setAttribute('style', 'display: none'); */

    // hide marbles bags
    document.getElementsByClassName('sacBille1')[0].setAttribute('style', 'display: none');
    document.getElementsByClassName('sacBille2')[0].setAttribute('style', 'display: none');

    // hide hands
    document.getElementsByClassName('mainOuverte')[0].setAttribute('style', 'display: none');
    document.getElementsByClassName('mainFermee')[0].setAttribute('style', 'display: none');

    // hide and stop timer
    document.getElementsByClassName('timer')[0].setAttribute('style', 'display: none');
    start();

    // add grayscales to the header and playArea
    document.getElementsByTagName('header')[0].setAttribute('style', 'filter: grayscale(1)');
    document.getElementsByClassName('playArea')[0].setAttribute('style', 'filter: grayscale(1)');

    // display game over message
    document.getElementsByClassName('gameOver')[0].setAttribute('style', 'display: block');

    stopAudio(music);

    btn_rules.removeEventListener('click', displayRules);

    callBack;
}

function gameOverWin(): void {
    playAudio(sound, tab_characters[id].death, 0.2, false);
}

function gameOverLose(): void {
    playAudio(sound, tab_characters[6].death, 0.2, false);
}