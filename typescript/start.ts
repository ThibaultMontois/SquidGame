/***************************************** VARIABLES *******************************************/
let btn_versus = document.getElementsByClassName('button')[0] as HTMLButtonElement;
let btn_start = document.getElementsByTagName('input')[0] as HTMLInputElement;
let btn_rules = document.getElementsByClassName('btnSmall')[0] as HTMLButtonElement;

let rules = document.getElementsByClassName('rules')[0] as HTMLElement;
let characters = document.getElementsByClassName('characters')[0] as HTMLElement;
let chkbx_characters = document.getElementsByName('chkbx_characters') as NodeListOf<HTMLInputElement>;

let tab_characters =
    [
        { img: 'images/characters/Oh_Il-nam_001_small.jpg', marble: 'images/marbles/grey_marble.png', theme: 'musiques/themes/ssf2_akuma_theme.mp3', voice: 'musiques/voices/akuma_voice.mp3', death: 'musiques/voices/akuma_death.mp3' },
        { img: 'images/characters/Kang_Sae-byeok_067_small.jpg', marble: 'images/marbles/purple_marble.png', theme: 'musiques/themes/ssf2_chun_li_theme.mp3', voice: 'musiques/voices/chun_li_voice.mp3', death: 'musiques/voices/chun_li_death.mp3' },
        { img: 'images/characters/Jang_Deok-su_101_small.jpg', marble: 'images/marbles/red_marble.png', theme: 'musiques/themes/ssf2_m_bison_theme.mp3', voice: 'musiques/voices/m_bison_voice.mp3', death: 'musiques/voices/m_bison_death.mp3' },
        { img: 'images/characters/Ali_Abdul_199_small.jpg', marble: 'images/marbles/orange_marble.png', theme: 'musiques/themes/ssf2_dhalsim_theme.mp3', voice: 'musiques/voices/dhalsim_voice.mp3', death: 'musiques/voices/dhalsim_death.mp3' },
        { img: 'images/characters/Han_Mi-nyeo_212_small.jpg', marble: 'images/marbles/yellow_marble.png', theme: 'musiques/themes/ssf2_cammy_theme.mp3', voice: 'musiques/voices/cammy_voice.mp3', death: 'musiques/voices/cammy_death.mp3' },
        { img: 'images/characters/Cho_Sang-woo_218_small.jpg', marble: 'images/marbles/green_marble.png', theme: 'musiques/themes/ssf2_ken_theme.mp3', voice: 'musiques/voices/ken_voice.mp3', death: 'musiques/voices/ken_death.mp3' },
        { img: 'images/characters/Seong_Gi-hun_456_small.jpg', marble: 'images/marbles/blue_marble.png', theme: 'musiques/themes/ssf2_ryu_theme.mp3', voice: 'musiques/voices/ryu_voice.mp3', death: 'musiques/voices/ryu_death.mp3' }
    ];

let id: number;

let music = document.getElementsByTagName('audio')[0] as HTMLAudioElement;
let sound = document.getElementsByTagName('audio')[1] as HTMLAudioElement;

/**************************************** EVENTS LISTENERS *******************************************/
btn_versus.addEventListener('click', displayCharactersSelection);
btn_start.addEventListener('click', startGame);
btn_rules.addEventListener('click', displayRules);

for (let i = 0; i < 6; i++) {
    chkbx_characters[i].addEventListener('click', checkCharacter);
}

document.addEventListener('click', initializeAudio);

/******************************************** FUNCTIONS ************************************************/
function displayRules(): void {
    if (btn_rules.classList.contains('active')) {
        rules.style.display = 'none';
        btn_rules.classList.remove('active');
        start();
    } else {
        rules.style.display = 'block';
        btn_rules.classList.add('active');
        start();
    }
}

function displayCharactersSelection(): void {
    if (btn_versus.classList.contains('active')) {
        characters.style.display = 'none';
        findCheckedCharacter().checked = false;
        btn_start.classList.add('desactive');
        btn_versus.classList.remove('active');
    } else {
        playAudio(sound, 'musiques/versus.mp3', 0.2, false);
        characters.style.display = 'flex';
        btn_versus.classList.add('active');
    }
}

function findCheckedCharacter(): HTMLInputElement {
    let i: number;
    for (i = 0; i < chkbx_characters.length - 1; i++) {
        if (chkbx_characters[i].checked) return chkbx_characters[i];
    }
    return chkbx_characters[i];
}

function checkCharacter(): void {
    playAudio(sound, tab_characters[getCharacterCheckedID()].voice, 0.2, false);
    btn_start.classList.remove('desactive');
}

function getCharacterCheckedID(): number {
    let character = findCheckedCharacter();
    return parseInt(character.id[character.id.length - 1]) - 1;
}

function startGame(e: Event): void {
    e.preventDefault();
    if (!btn_start.classList.contains('desactive')) {
        id = getCharacterCheckedID();

        // FIGHT !!!
        playAudio(sound, 'musiques/fight.mp3', 0.2, false);

        // uncheck character
        findCheckedCharacter().checked = false;

        // unactive start button
        btn_start.classList.add('desactive');

        // hide menu, start background logo and characters selection
        document.getElementsByClassName('elMenu')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('logoSquidGame')[0].setAttribute('style', 'display: none');
        characters.setAttribute('style', 'display: none');

        // display header logo
        document.getElementsByClassName('logoSmall')[0].setAttribute('style', 'visibility: visible');

        // set opponent img
        document.getElementsByClassName('imgCircle')[1].setAttribute('src', tab_characters[id].img);
        //display header fighters container
        document.getElementsByClassName('containerFight')[0].setAttribute('style', 'display: flex');

        // display fight area background
        document.getElementsByClassName('ringBoxe')[0].setAttribute('style', 'display: block');

        // display bets and marbles button and inputs
        document.getElementById('betMarbles')?.setAttribute('style', 'display: block');
        document.getElementById('numberMarblesHand')?.setAttribute('style', 'display: block');
        document.getElementById('betMarbles2')?.setAttribute('style', 'display: block');
        document.getElementById('numberMarblesHand2')?.setAttribute('style', 'display: block');

        // set and display marbles
        let marbles = document.getElementsByClassName('marbles2')[0] as HTMLElement;
        for (let i = 0; i < 10; i++) {
            marbles.getElementsByTagName('img')[i].src = tab_characters[id].marble
        }
        document.getElementsByClassName('charactersMarbles')[0].setAttribute('style', 'display: flex');

        // display marbles bags
        document.getElementsByClassName('sacBille1')[0].setAttribute('style', 'display: block');
        document.getElementsByClassName('sacBille2')[0].setAttribute('style', 'display: block');

        // display closed hands
        document.getElementsByClassName(' mainFermee')[0].setAttribute('style', 'display: block');

        // display and start timer
        document.getElementsByClassName('timer')[0].setAttribute('style', 'display: block');
        start();

        // set and play opponent's theme
        playAudio(music, tab_characters[id].theme, 0.05, true);
    }
}

/* AUDIO */
function playAudio(audio: HTMLAudioElement, src: string, vol: number, islooping: boolean): void {
    audio.setAttribute('src', src);
    audio.volume = vol;
    audio.loop = islooping;
    audio.play();
}

function stopAudio(audio: HTMLAudioElement) {
    audio.pause();
    audio.currentTime = 0;
}

function initializeAudio(): void {
    playAudio(music, 'musiques/themes/squid_game_theme.mp3', 0.05, true);
    document.removeEventListener('click', initializeAudio);
}