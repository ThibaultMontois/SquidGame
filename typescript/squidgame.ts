/**
 * Ils doivent deviner combien l'autre joueur à de billes dans la main, 
 * ou si le nombre est pair ou impair. Ils misent un nombre de billes de leur choix. 
 * S'il gagne, il remporte une partie des billes de l'adversaire, 
 * s'il perd il doit lui donner une partie des siennes. 
 * Le premier qui n'a plus de billes a perdu.
 * 
 */
//Déclaration et initalisation des variables 
let isTimerActive = false;
let elementSpanMin = document.getElementById('minutes') as HTMLElement;
let elementSpanSecond = document.getElementById('seconds') as HTMLElement;
let betMarbles = document.getElementById("betMarbles") as HTMLInputElement;
let betMarbles2 = document.getElementById("betMarbles2") as HTMLInputElement;
let inputPlayerNbrMarblesHand = document.getElementById("numberMarblesHand") as HTMLInputElement;
let inputPlayerNbrMarblesHand2 = document.querySelector("#numberMarblesHand2") as HTMLInputElement;
let inputNumberMarbles = document.querySelector("#numberMarbles") as HTMLInputElement;
let inputComputer = document.querySelector("#numberMarbles2") as HTMLInputElement;
let minute: number = 3;
let second: number = 60;
let cron: number;
let resultGame = document.querySelector("#resultGame") as HTMLButtonElement;
let countNbrClick: number = 0;
let joueur:string = "j1";
let mainFermee = document.querySelector(".mainFermee") as HTMLElement;
let mainOuverte = document.querySelector(".mainOuverte") as HTMLElement;

/**
 * Démarrer le timer 
 */
function start(): void {
  if (!isTimerActive) { 
    cron = setInterval(() => { timer(); }, 1000);
    isTimerActive = true;
  } else {
    pause();
    isTimerActive = false;
  }
}

/**
 * Mettre en pause le timer 
 */
function pause(): void {
  clearInterval(cron);
}

/**
 * Remettre à la valeur initiale le compteur du timer
 */
function reset(): void {
  minute = 3;
  second = 0;
  document.getElementById('minutes')!.innerText = '03';
  document.getElementById('seconds')!.innerText = '60';
}

/**
 * Fonction génère un timer
 */
function timer(): void {
  second--;
  if ((second) == 59) {
    minute--;
  } else if (second == 0) {
    second = 60;
  }
  elementSpanSecond.innerText = returnData(second);
  elementSpanMin.innerText = returnData(minute);
  if (minute == 0 && second == 60) {
    pause();
  }
}

/**
 * permet de mettre un 0 devant le chiffre
 * @param input 
 * @returns 
 */
function returnData(input: number): string {
  return input % 60 >= 10 ? `${input % 60}` : `0${input % 60}`
}

/**
 * Cette fonction permet de générer le nbr aleatoire de billes dans la main de l'ordinateur
 * @returns générer le nbr aleatoire
 */
function randomNumberMarbles(): number {
  let numberMarbles: number;
  return numberMarbles = Math.floor(Math.random() * 10) + 1;
}

/**
 * Génération d'un nombre aléatoire pour pair ou impair
 * @returns 
 */
function randomPairOrImpair(): number {
  let numberMarbles: number;
  return numberMarbles = Math.floor(Math.random() * 10) + 1;
}

/**
 * Function qui transforme le nombre soit en pair ou impair de l'ordinateur
 * @param randomNumberMarble 
 * @returns 
 */
function isPairOrImpaire(randomNumberMarble: number): "Pair" | "Impair" {
  if ((randomNumberMarble % 2) == 0) {
    return "Pair";
  } else {
    return "Impair";
  }
}


/**
 * Fonction qui permet de récupérer la valeur du pari du joueur (pair ou impair) 
 * @returns 
 */
function getBetValuePlayer(): string {
  return betMarbles.value;
}

/**
 * Fonction qui permet de récupérer la valeur du pari de l'ordinateur (pair ou impair)
 * @returns pari de l'ordinateur (pair ou impair)
 */
function getBetValuePlayerComputer(): string {
  betMarbles2.value = isPairOrImpaire(randomPairOrImpair());
  return betMarbles2.value;
}

/**
 * Fonction qui permet de recupérer la valeur du joueur si le jeu pair ou impair 
 * @returns si le jeu pair ou impair 
 */
function getValueHandPlayer(): number {
  return parseInt(inputNumberMarbles.value);
}

/**
 * Fonction qui permet d'injecter la valeur du joueur (pair ou impair) 
 * @returns 
 */
function injectValueHandPlayer(): string {
  inputNumberMarbles.value = getValueHandPlayer().toString();
  return inputNumberMarbles.value;
}

/**
 * function qui retourne le nbr de bille que le joueur à dans la main
 * @returns le nbr de bille que le joueur à dans la main
 */
function nbrMarblesPlayer(): string {
  return inputPlayerNbrMarblesHand.value;
}

/**
 * Fonction qui injecte pair ou impair en fonction du nbr de bille dans la main du joueur 
 */
function injectvaluePairOrImpairMarblesHand(): void {
  inputNumberMarbles.value = isPairOrImpaire(parseInt(nbrMarblesPlayer()));
}

/**
 * Fonction qui permet d'afficher le pari de l'ordi que lorsque l'on fait un pari
 */
function injectValueMarblesHandPlayer(): void {
  inputPlayerNbrMarblesHand.addEventListener("change", function () {
    injectvaluePairOrImpairMarblesHand();
  });
}

/**
 * Function qui permet de générer et d'injecter le nbr de billes que l'ordinateur à dans la main 
 * @returns nombre de billes de l'ordinateur
 */
function InjectNbrMarblesPlayerComputer(): string {
  return inputPlayerNbrMarblesHand2.value = randomNumberMarbles().toString();
}

/**
 * Permet de convertir le nombre de bille dans la main de l'ordinateur en pair ou impair
 * @returns pair ou impair
 */
function injectValueInputComputer(): string {
  if (parseInt(InjectNbrMarblesPlayerComputer()) % 2 == 0) {
    inputComputer.value = "Pair"
  } else {
    inputComputer.value = "Impair"
  }
  return inputComputer.value;
}

/**
 * fonction qui transforme input type text en password et vice versa 
 */
function displayNumberOfMarbleOrPairOrImpair(): void {

  if (inputComputer.type === "password" && inputNumberMarbles.type === "password"
    && inputPlayerNbrMarblesHand2.type === "password" && inputPlayerNbrMarblesHand.type === "password"
    && betMarbles2.type === "password") {

    inputComputer.type = "text";
    inputNumberMarbles.type = "text";
  }
  else {
    inputComputer.type = "password";
    inputNumberMarbles.type = "password";
    inputPlayerNbrMarblesHand2.type = "password";
    inputPlayerNbrMarblesHand.type = "password";
    betMarbles2.type = "password";
  }
}

/**
 * Logique de calcul des billes quand le joueur perd
 */
function playerLoose(): void {
  for (let i = 0; i < parseInt(inputPlayerNbrMarblesHand.value); i++) {

    let marblePlayer = document.querySelector(".marbles1")?.lastElementChild as HTMLImageElement;
    if (marblePlayer) {
      let marble = document.querySelector(".marbles2") as HTMLElement;
      marble.append(marblePlayer);
    }
  }
}

/**
 * Logique de calcul des billes quand le joueur gagne
 */
function playerWin(): void {
  //ce que l'on a dans la main.length
  for (let i = 0; i < parseInt(inputPlayerNbrMarblesHand.value); i++) {
    let marble = document.querySelector(".marbles2")?.lastElementChild as HTMLImageElement;
    if (marble) {
      let marblePlayer = document.querySelector(".marbles1") as HTMLElement;
      marblePlayer.append(marble);
    }
  }
}
/**
 * Logique de calcul des billes quand l'ordinateur gagne
 */
function computerWin(): void {
  //ce que l'on a dans la main.length
  for (let i = 0; i < parseInt(inputPlayerNbrMarblesHand2.value); i++) {
    let marblePlayer = document.querySelector(".marbles1")?.lastElementChild as HTMLImageElement;
    if (marblePlayer) {
      let marble = document.querySelector(".marbles2") as HTMLElement;
      marble.append(marblePlayer);
    }
  }
}

/**
 * Logique de calcul des billes quand l'ordinateur perd
 */
function computerLoose(): void {
  //ce que l'on a dans la main.length
  for (let i = 0; i < parseInt(inputPlayerNbrMarblesHand2.value); i++) {
    let marble = document.querySelector(".marbles2")?.lastElementChild as HTMLImageElement;
    if (marble) {
      let marblePlayer = document.querySelector(".marbles1") as HTMLElement;
      marblePlayer.append(marble);
    }
  }
}

/**
 * Fonction attribution des billes si c'est l'ordinateur qui joue 
 */
function getAndCompareResultGamePlayer(): void {
  if (betMarbles.value.toUpperCase() !== inputComputer.value.toUpperCase()) {
    playerLoose();
  } else {
    playerWin();
  }
}

/**
 * Fonction attribution des billes si c'est l'ordinateur qui joue 
 */
function getAndCompareResultGameComputer(): void {
  if (betMarbles2.value.toUpperCase() != inputNumberMarbles.value.toUpperCase()) {
    computerLoose();
  } else {
    computerWin();
  }
}

/**
 * Si l'input du pari du joueur est vide 
 * j'applique le transfert des billes en fonction de l'ordi
 * sinon en fonction du joueur 
 */
function giveMarbles(): void {
  if (joueur == "j1") {
    joueur = "j2";
    betMarbles.disabled = true;
  }else{
    joueur = "j1";
    betMarbles.disabled =false;
  }
  if (betMarbles.value === "") {
    getAndCompareResultGameComputer();
   
  } else {
    getAndCompareResultGamePlayer();
  }
}


/**
 * Initialisation du jeu
 */
function init():void {
  //Injecte le pari de l'ordinateur
  getBetValuePlayerComputer();
  //Pari ordinateur en password 
  betMarbles2.type = "password";
  localStorage.setItem('valuePairOrImpairComputer', injectValueInputComputer());
  localStorage.setItem('valueNbrMarblesHandComputeur', inputPlayerNbrMarblesHand2.value);
  //j'affiche le pari de l'ordinateur lorsque que l'on mise le nbr de bille 
  inputPlayerNbrMarblesHand.addEventListener("change", function () {
    betMarbles2.type = "text";
  });
  //permet d'injecter si le joueur a dans la main un nbr de bille pair ou impair 
  injectValueMarblesHandPlayer();
  mainOuverte.style.display = "none";
}

init();

//Contient toute la logique du jeu
resultGame.addEventListener("click", function () {

  countNbrClick += 1;
  mainFermee.style.display = "";
  //si le nombre de click est impair je remet les valeurs à zero sauf pour l'ordi qui regénère automatiquement la valeur
  if (countNbrClick % 2 !== 0) {
    //attribution du nbr de bille du joueur  ou à l'ordi
    giveMarbles();
   
    //je supprime localStorage après avoir verifier le resultat
    localStorage.removeItem("valuePairOrImpairComputer");
    localStorage.removeItem("valueNbrMarblesHandComputeur");

    //je vide les inputs du player 
    resultGame.addEventListener("click", function () {
      inputNumberMarbles.value = "";
      inputPlayerNbrMarblesHand.value = "";
      betMarbles.value = "";
      
    });
     mainFermee.style.display = "none";
     mainOuverte.style.display = "block";
    //permet de cacher le nbr de bille dans la main de l'ordi et du joueur 
    inputPlayerNbrMarblesHand2.type = "password";
    inputPlayerNbrMarblesHand.type = "password";

    //ré-affichage du reultat 
    displayNumberOfMarbleOrPairOrImpair();
    inputComputer.type = "text";
    

  } else {
    mainFermee.style.display = "block";
    mainOuverte.style.display = "none";
    //fonction qui permet d'afficher le pari de l'ordi que lorsque l'on a fait une mise
    injectValueMarblesHandPlayer();
    localStorage.setItem('valuePairOrImpairComputer', injectValueInputComputer());
    localStorage.setItem('valueNbrMarblesHandComputeur', inputPlayerNbrMarblesHand2.value)
    //valeur dans le local storage 
    localStorage.getItem("valuePairOrImpairComputer");
    localStorage.getItem("valueNbrMarblesHandComputeur");
    //Affichage de ce qu'ils ont mis dans leur main.(transforme password en text) 
    displayNumberOfMarbleOrPairOrImpair();
  }
});



