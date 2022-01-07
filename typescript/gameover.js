"use strict";
let player_marbles = document.getElementsByClassName('marbles1')[0];
let opponent_marbles = document.getElementsByClassName('marbles2')[0];
let seconds = document.getElementsByClassName('timer')[0].lastElementChild;
let player_marbles_observer = new MutationObserver(playerMarblesEvent);
player_marbles_observer.observe(player_marbles, { childList: true });
let opponent_marbles_observer = new MutationObserver(opponentMarblesEvent);
opponent_marbles_observer.observe(opponent_marbles, { childList: true });
let timer_observer = new MutationObserver(timerEvent);
timer_observer.observe(seconds, { childList: true, characterData: true });
function playerMarblesEvent() {
    let nbr_marbles = player_marbles.getElementsByTagName('img').length;
    if (nbr_marbles === 0)
        gameOver(gameOverLose());
}
function opponentMarblesEvent() {
    let nbr_marbles = opponent_marbles.getElementsByTagName('img').length;
    if (nbr_marbles === 0)
        gameOver(gameOverWin());
}
function timerEvent() {
    let minutes = document.getElementsByClassName('timer')[0].firstElementChild;
    if (minutes.textContent === '00' && seconds.textContent === '00') {
        gameOver(gameOverLose());
    }
}
function gameOver(callBack) {
    var _a, _b, _c, _d, _e, _f, _g;
    // hide numberMarbles inputs and resultGame button
    (_a = document.getElementById('numberMarbles')) === null || _a === void 0 ? void 0 : _a.setAttribute('style', 'display: none');
    (_b = document.getElementById('numberMarbles2')) === null || _b === void 0 ? void 0 : _b.setAttribute('style', 'display: none');
    (_c = document.getElementById('resultGame')) === null || _c === void 0 ? void 0 : _c.setAttribute('style', 'display: none');
    // hide fight area background
    /* document.getElementsByClassName('ringBoxe')[0].setAttribute('style', 'display: none'); */
    // hide bets and marbles button and inputs
    (_d = document.getElementById('betMarbles')) === null || _d === void 0 ? void 0 : _d.setAttribute('style', 'display: none');
    (_e = document.getElementById('numberMarblesHand')) === null || _e === void 0 ? void 0 : _e.setAttribute('style', 'display: none');
    (_f = document.getElementById('betMarbles2')) === null || _f === void 0 ? void 0 : _f.setAttribute('style', 'display: none');
    (_g = document.getElementById('numberMarblesHand2')) === null || _g === void 0 ? void 0 : _g.setAttribute('style', 'display: none');
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
function gameOverWin() {
    playAudio(sound, tab_characters[id].death, 0.2, false);
}
function gameOverLose() {
    playAudio(sound, tab_characters[6].death, 0.2, false);
}
