import { ordListe } from "ordliste.js";

const antalGæt = 6;
let gætTilbage = antalGæt;
let ditGæt = [];
let næsteBogstav = 0;
let korrektOrd = ordListe[Math.floor(Math.random() * ordListe.length)]

console.log(korrektOrd)

function initBoard() {
    let board = document.getElementById("game-board");

    /* Laver 6 rækker */
    for (let i = 0; i < antalGæt; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        /* Laver 5 bokse i hver række */
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            /* Sætter bogstav div ind i row div */
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

/* Sletter bogstav */
function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[6 - gætTilbage]
    let box = row.children[næsteBogstav - 1]
    box.textContent = ""
    ditGæt.pop()
    næsteBogstav -= 1
}

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[6 - gætTilbage]
    let guessString = ''
    let rightGuess = Array.from(korrektOrd)

    for (const val of ditGæt) {
        guessString += val
    }

    if (guessString.length != 5) {
        alert("Du har ikke indtastet nok bogstaver")
        return
    }

    if (!ordListe.includes(guessString)) {
        alert("Ordet er ikke på listen")
        return
    }

    
    for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = ditGæt[i]
        
        let letterPosition = rightGuess.indexOf(ditGæt[i])
        /* Tjekker om bogstavet er i ordet */
        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
        /* Tjekker bogstavets placering i ordet */
            if (ditGæt[i] === rightGuess[i]) {
                letterColor = 'green'
            } else {
                letterColor = 'yellow'
            }

            rightGuess[letterPosition] = "#"
        }
            box.style.backgroundColor = letterColor
    }
    /* Alert når man har fundet det rigtige ord og vundet spillet */
    if (guessString === korrektOrd) {
        alert("Du har gættet det rigtige ord!")
        gætTilbage = 0
        return
    } else {
        gætTilbage -= 1;
        ditGæt = [];
        næsteBogstav = 0;
    /* Taber besked */
        if (gætTilbage === 0) {
            alert("Du har ikke flere gæt.")
            alert(`Det rigtige ord er: "${korrektOrd}"`)
        }
    }
}

/* Indsætter bogstav og skifter til næste række hver gang et bogstav bliver indtastet. */
function insertLetter (pressedKey) {
    if (næsteBogstav === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[6 - gætTilbage]
    let box = row.children[næsteBogstav]
    box.textContent = pressedKey
    ditGæt.push(pressedKey)
    næsteBogstav += 1
}

document.addEventListener("keyup", (e) => {

    if (gætTilbage === 0) {
        return
    }

    /* Sletter bogstav ved backspace hvis antalgæt ikke er 0 */
    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && næsteBogstav !== 0) {
        deleteLetter()
        return
    }

    /* Checker gæt ved Enter */
    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    /* Tjekker om det indtastede bogstav er tilladt */
    let found = pressedKey.match(/[a-å]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

/* Tilføjer eventlistener og laver "Del" om til "backspace"  */
document.getElementById("keyboard").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("knap")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

/* Start spil */
initBoard();
