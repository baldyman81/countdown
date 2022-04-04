const tileDisplay = document.querySelector('.tile-container');
const guessDisplay = document.querySelector('.guess-container');
const keyboard = document.querySelector('.key-container');
const gameClock = document.querySelector('.timer');
const vowelButton = document.querySelector('.vowel');
const consButton = document.querySelector('.consonant');
const clearButton = document.querySelector('.clear');
const submitButton = document.querySelector('.submit');
const Tiles = ['','','','','','','','',''];
const guessTiles = ['','','','','','','','',''];
const keys = [
    'Q',
    'W',
    'R',
    'T',
    'Y',
    'P',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M'
];
const vowels = [
    'A',
    'E',
    'I',
    'O',
    'U'
]
const dictionary = [
    'AESTHETIC',
    'ZEBRA',
    'WHALES'
]
let currentTile = 0;
let currentPlayerTile = 0;
let gameStarted = false;
let gameTimer = 30;

// Section handles behaviour for original game tiles up top

function updatePlayerTiles() {
    console.log(guessTiles)
    for (let index = 0; index < 9; index++) {
        const playerTile = document.getElementById('guessTile' + index)
        const letter = guessTiles[index]
        console.log(playerTile, letter)
        playerTile.textContent = letter
    }
}

function getVowel() {
    if (currentTile < 9) {
        let randomNum = Math.floor(Math.random() * vowels.length)
        letter = vowels[randomNum]
        Tiles[currentTile] = vowels[randomNum]
        addLetter(letter)
        currentTile++
        if (currentTile > 8) {
            gameStarted = true
            countdownTimer();
            setInterval(countdownTimer, 1000);
        }
    }
}

function getCons() {
    if (currentTile < 9) {
        let randomNum = Math.floor(Math.random() * keys.length)
        letter = keys[randomNum]
        Tiles[currentTile] = keys[randomNum]
        addLetter(letter)
        currentTile++
        if (currentTile > 8) {
            gameStarted = true
            countdownTimer();
            setInterval(countdownTimer, 1000);
        }
    }
}

const addLetter = (letter) => {
    if (currentTile < 9) {
        const tile = document.getElementById('tile' + currentTile)
        tile.textContent = letter
        tile.setAttribute('data', letter)
    }
}

function countdownTimer() {
    let remaining = gameTimer--
    if (remaining < 1) {
        document.getElementById('timer').innerHTML = "Time's up!"
    } else document.getElementById('timer').innerHTML = remaining
}

function removeLetter(e) {
    let let2Rem = e.target
    let position = String(let2Rem.id).charAt(4)
    console.log(position)
    let letterSource = let2Rem.id
    let letter = let2Rem.textContent
    let2Rem.textContent = ""
    passLetter(letter, letterSource)
}

function passLetter(letter, letterSource) {
    console.log("letter passed - " + letter + letterSource)
    if (letterSource[0] == "t") {
        const firstSpace = guessTiles.findIndex(tile => tile === "")
        console.log(firstSpace)
        console.log(guessTiles[firstSpace])
        guessTiles[firstSpace] = letter
        updatePlayerTiles();
    } 
}

function clearTiles() {
    // reset the top tiles
    for (let index = 0; index < 9; index++) {
        const topTile = document.getElementById('tile' + index)
        const bottomTile = document.getElementById('guessTile' + index)
        const topLetter = Tiles[index]
        guessTiles[index] = ""
        const bottomLetter = guessTiles[index]
        topTile.textContent = topLetter
        bottomTile.textContent = bottomLetter
    }
}
// checks if the word is listed in the dictionary
function checkWord() {
    let stringGuess = guessTiles.toString().replaceAll(',','')
    console.log(stringGuess)
    if ( dictionary.includes(stringGuess) ) {
        console.log("Good Job")
    } else console.log("Not a word")
}
// Setup game tiles and buttons

Tiles.forEach((Tile, tileIndex) => {
    const tileElement = document.createElement('div')
    tileElement.setAttribute('id', 'tile' + tileIndex)
    tileElement.addEventListener('click', removeLetter)
    tileDisplay.append(tileElement);
})

guessTiles.forEach((guessTile, guessTileIndex) => {
    const guessTileElement = document.createElement('div')
    guessTileElement.setAttribute('id', 'guessTile' + guessTileIndex)
    guessTileElement.addEventListener('click', removeLetter)
    guessDisplay.append(guessTileElement);
})



vowelButton.addEventListener('click', getVowel)
consButton.addEventListener('click', getCons)
clearButton.addEventListener('click', clearTiles)
submitButton.addEventListener('click', checkWord)
